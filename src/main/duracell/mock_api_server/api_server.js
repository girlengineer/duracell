var express = require('express'),
    _ = require("underscore"),
    path = require("path"),
    fs = require("fs"),
    bodyParser = require("body-parser"),
    apiMocker = {},
    jsonPath = require('JSONPath'),
    util = require('util'),
    https = require('https'),
    querystring = require('querystring'),
    btoa = require('btoa');

apiMocker.defaults = {
    "port": "8888",
    "mockDirectory": "./mocks/",
    "allowedDomains": ["*"],
    "allowedHeaders": ["Content-Type", "OmniChannel"],
    "webServices": {}
};

apiMocker.createServer = function (options) {
    options = options || {};
    apiMocker.express = express();
    
    apiMocker.express.use(bodyParser.urlencoded({extended: true}));
    apiMocker.express.use(bodyParser.json());
    apiMocker.express.use(apiMocker.corsMiddleware);
    apiMocker.router = express.Router();
    apiMocker.express.use(apiMocker.router);

    apiMocker.options = _.defaults(options, apiMocker.defaults); 

    apiMocker.log = function (msg) {
        if (!apiMocker.options.quiet) {
            console.log(msg);
        }
    };
    return apiMocker;
};

apiMocker.setConfigFile = function (file) {
    if (!file) {
        return apiMocker;
    } else if (path.sep !== file.substr(0, 1)) {
        // relative path from command line
        apiMocker.configFilePath = path.resolve(process.cwd(), file);
    } else {
        apiMocker.configFilePath = file;
    }
    return apiMocker;
};

apiMocker.loadConfigFile = function () {
    if (apiMocker.configFilePath) {
        // apiMocker.log("Loading config file: " + apiMocker.configFilePath);
        // Switched to use fs.readFileSync instead of "require"
        // this makes testing easier, and avoids messing with require cache.
        var newOptions = _.clone(apiMocker.defaults),
            configJson = JSON.parse(fs.readFileSync(apiMocker.configFilePath));
        newOptions = _.extend(newOptions, apiMocker.options, configJson);
        // console.log("util:::" + util.inspect(newOptions, false, null));
        // console.log("JSON stringify::" +JSON.stringify(newOptions));
        apiMocker.options = newOptions;
        apiMocker.options.webServices = apiMocker.normalizeWebServicesConfig(apiMocker.options.webServices);

        // console.log("Webservices" +util.inspect(apiMocker.options.webServices,
        // false, null));
        apiMocker.setRoutes(apiMocker.options.webServices);
    } else {
        apiMocker.log("No config file path set.");
    }
};

apiMocker.normalizeWebServicesConfig = function (webServices) {
    var topLevelKeys = _.keys(webServices), newWebServices = {};
    // console.log("Top Level Keys::: " + util.inspect(topLevelKeys, false,
    // null));
    // console.log("Top Level Keys[0]::: " +
    // util.inspect(webServices[topLevelKeys[0]], false, null));
    // console.log("Top Level Keys[0] mockfile ::: " +
    // util.inspect(webServices[topLevelKeys[0]].mockFile, false, null));
    if (webServices[topLevelKeys[0]] && webServices[topLevelKeys[0]].mockFile) {
        return webServices;
    } else {
        apiMocker.log("WARNING: apimocker config file format is deprecated.");
        _.each(topLevelKeys, function (verb) {
            var newSvc, serviceKeys = _.keys(webServices[verb]);
            _.each(serviceKeys, function (key) {
                if (newWebServices[key]) {
                    newSvc = newWebServices[key];
                    newSvc.verbs[newSvc.verbs.length] = verb;
                } else {
                    newWebServices[key] = {
                        "mockFile": webServices[verb][key],
                        "verbs": [verb]
                    };
                }
            });
        });
        return newWebServices;
    }
};

apiMocker.createAdminServices = function () {
    apiMocker.router.all("/admin/reload", function (req, res) {
        apiMocker.stop();
        apiMocker.createServer(apiMocker.options).start();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end('{"configFilePath": "' + apiMocker.configFilePath + '", "reloaded": "true"}');
    });

    apiMocker.router.all("/admin/setMock", function (req, res) {
        var newRoute = {};
        if (req.body.serviceUrl && req.body.verb && req.body.mockFile) {
            apiMocker.log("Received JSON request: " + JSON.stringify(req.body));
            newRoute = req.body;
            newRoute.verb = newRoute.verb.toLowerCase();
        } else {
            newRoute.verb = req.param('verb').toLowerCase();
            newRoute.serviceUrl = req.param('serviceUrl');
            newRoute.mockFile = req.param('mockFile');
            newRoute.latency = req.param('latency');
            newRoute.contentType = req.param('contentType');
        }
        // also need to save in our webServices object.
        delete apiMocker.options.webServices[newRoute.serviceUrl];
        apiMocker.options.webServices[newRoute.serviceUrl] = newRoute;
        apiMocker.setRoute(newRoute);

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(newRoute));
    });
};

apiMocker.setRoutes = function (webServices) {
    var topLevelKeys = _.keys(webServices);
    _.each(topLevelKeys, function (key) {
        var svc = _.clone(webServices[key]);
        // apiMocker.log("about to add a new service: " + JSON.stringify(svc));
        // console.log("SVC :::" + util.inspect(svc, false, null));
        _.each(svc.verbs, function (v) {
            apiMocker.setRoute(apiMocker.getServiceRoute(key, v));
        });
    });
};

apiMocker.getServiceRoute = function (path, verb) {

    var finalSvc = _.clone(apiMocker.options.webServices[path]);
    finalSvc.verb = verb.toLowerCase();
    finalSvc.serviceUrl = path;
    if (finalSvc.responses) {
        finalSvc = _.extend(finalSvc, finalSvc.responses[verb]);
        finalSvc.host = _.has(finalSvc.responses[finalSvc.verb], 'hostURL') || '<No Host>';
        finalSvc.path = _.has(finalSvc.responses[finalSvc.verb], 'hostPath') || '<No Path>';
    }
    if (typeof finalSvc.latency === "undefined") {
        finalSvc.latency = apiMocker.options.latency ? apiMocker.options.latency : 0;
    }
    finalSvc.httpStatus = finalSvc.httpStatus || 200;

    // console.log("Initial finalSvc :::" + util.inspect(finalSvc, false,
    // null));
    delete finalSvc.responses;
    delete finalSvc.verbs;
    // console.log("Final Sourav finalSvc :::" + util.inspect(finalSvc, false,
    // null));
    return finalSvc;
};

apiMocker.sendResponse = function (req, res, serviceKeys) {

    /*
     * console.log("Service keys::: " + util.inspect(serviceKeys, false, null));
     *
     * console.log("params:::" + _.keys(req.params)); console.log("body:::" +
     * _.keys(req.body)); console.log("query:::" + _.keys(req.query));
     * console.log("request::"+ _.pairs(req.body)); console.log("headers::"+
     * _.keys(req.headers)); console.log("headers::"+ req.headers.authorization);
     */


    var originalOptions, mockPath;
    // we want to look up the service info from our in-memory "webServices"
    // every time.
    var options = apiMocker.getServiceRoute(serviceKeys.serviceUrl, serviceKeys.verb);
    // console.log("New service route: " + JSON.stringify(options));

    // console.log("Options::: " + util.inspect(options, false, null));

    setTimeout(function () {

        if (options.httpStatus === 204 || options.httpStatus === 304) {
            // express handles these two differently - it strips out body,
            // content-type, and content-length headers.
            // there's no body or content-length, so we just send the status code.
            apiMocker.log("Returning http status: " + options.httpStatus);
            res.send(options.httpStatus);
            return;
        }
        if (options.switch) {
            options = _.clone(options);
            originalOptions = _.clone(options);
            apiMocker.setSwitchOptions(options, req);
            mockPath = path.join(apiMocker.options.mockDirectory, options.mockFile);
            if (!fs.existsSync(mockPath)) {
                apiMocker.log("No file found: " + options.mockFile + " attempting base file: " + originalOptions.mockFile);
                // options = originalOptions;
                options.mockFile = originalOptions.mockFile;
            }
        }

        if (options.hostURL) {

            var headerData = options.headers;
            if (_.has(headerData, "authorization-basic")) {
                // console.log('sdds'+headerData["authorization-basic"])
                headerData.Authorization = "Basic " + btoa(headerData["authorization-basic"]);
                delete headerData["authorization-basic"];
            }
            if ('' != req.headers.authorization && undefined != req.headers.authorization) {
                console.log(req.headers.authorization);
                headerData.Authorization = req.headers.authorization;
            }

            var post_data = querystring.stringify(req.body);
            // console.log("post data:: "+ post_data);
            headerData["Content-Length"] = post_data.length;
            // console.log('Header Data'+ util.inspect(headerData, false, null));

            var post_options = {
                host: options.hostURL,
                path: options.hostPath,
                method: 'POST',
                headers: headerData,
                rejectUnauthorized: false
            };
            var post_req = https.request(post_options, function (response) {
                response.setEncoding('utf8');
                var dataset = '';
                response.on('data', function (chunk) {
                    console.log('Response Data: ' + chunk);
                    dataset += chunk;
                    // res.end(chunk);
                });
                response.on('end', function () {
                    console.log("Close received!");
                    res.end(dataset);
                });
            });

            post_req.write(post_data);
            post_req.end();

        }
        else {

            mockPath = path.join(apiMocker.options.mockDirectory, options.mockFile);
            apiMocker.log("Returning mock: " + options.verb.toUpperCase() + " " + options.serviceUrl + " : " +
            options.mockFile);

            if (options.contentType) {
                res.header('Content-Type', options.contentType);
                fs.readFile(mockPath, {encoding: "utf8"}, function (err, data) {
                    if (err) {
                        throw err;
                    }
                    var buff = new Buffer(data, 'utf8');
                    res.status(options.httpStatus).send(buff);
                });
            } else {
                res.status(options.httpStatus).sendFile(encodeURIComponent(options.mockFile), {root: apiMocker.options.mockDirectory});
            }
        }
    }, options.latency);

};

// only used when there is a switch configured
apiMocker.setSwitchOptions = function (options, req) {
    var switchFilePrefix = "", switchParamValue,
        mockFileParts, mockFilePrefix = "", mockFileBaseName;

    var switches = options.switch;
    if (!(switches instanceof Array)) {
        switches = [switches];
    }

    switches.forEach(function (s) {
        switchParamValue = null;
        if (req.body[s]) { // json post request
            switchParamValue = encodeURIComponent(req.body[s]);
        } else if (req.param(s)) { // query param in get request
            switchParamValue = encodeURIComponent(req.param(s));
        }

        if (!switchParamValue && (s.indexOf("$.") === 0)) {
            // use JsonPath - use first value found if multiple occurances exist
            var allElems = jsonPath.eval(req.body, s);  // jshint ignore:line
            if (allElems.length > 0) {
                switchParamValue = encodeURIComponent(allElems[0]);
            }
        }

        if (switchParamValue) {
            switchFilePrefix = switchFilePrefix + s + switchParamValue;
        }
    });

    if (!switchFilePrefix) {
        return;
    }

    if (options.switchResponses && options.switchResponses[switchFilePrefix]) {
        _.extend(options, options.switchResponses[switchFilePrefix]);
        if (options.switchResponses[switchFilePrefix].mockFile) {
            return;
        }
    }

    mockFileParts = options.mockFile.split("/");
    mockFileBaseName = mockFileParts.pop();
    if (mockFileParts.length > 0) {
        mockFilePrefix = mockFileParts.join("/") + "/";
    }
    options.mockFile = mockFilePrefix + switchFilePrefix + "." + mockFileBaseName;
};

// Sets the route for express, in case it was not set yet.
apiMocker.setRoute = function (options) {
    var displayFile = options.mockFile || "<no mockFile>",
        displayLatency = options.latency ? options.latency + " ms" : "";
    options.httpStatus = options.httpStatus || 200;
    apiMocker.router[options.verb]("/" + options.serviceUrl, function (req, res) {

        apiMocker.sendResponse(req, res, options);
    });
    apiMocker.log("Set route: " + options.verb.toUpperCase() + " " + options.serviceUrl + " : " +
    displayFile + " " + displayLatency);
    if (options.switch) {
        apiMocker.log("   with switch on param: " + options.switch);
    }
};

// CORS middleware
apiMocker.corsMiddleware = function (req, res, next) {
    var allowedHeaders = apiMocker.options.allowedHeaders.join(',');
    res.header('Access-Control-Allow-Origin', apiMocker.options.allowedDomains);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', allowedHeaders);

    next();
};


apiMocker.handleError = function(req, res){
    if (req.query.code){
        res.writeHead(req.query.code, {"Content-Type": "application/json"});    
        res.end("{ \"message\": \"Error code " +  req.query.code + "\"}");
    } else {
        res.writeHead(500, {"Content-Type": "application/json"});    
        res.end("{ \"message\": \"Error code 500\"}");
    }
}

apiMocker.createErrorService = function () {
    apiMocker.router.get("/error", function (req, res) {
        apiMocker.handleError(req, res);
    })
    apiMocker.router.post("/error", function (req, res) {
        apiMocker.handleError(req, res); 
    });
};

apiMocker.start = function (port) {
    apiMocker.createAdminServices();
    apiMocker.createErrorService();
    apiMocker.loadConfigFile();
    port = port || apiMocker.options.port;
    // console.log(JSON.stringify(apiMocker.options));
    if (apiMocker.options.staticDirectory && apiMocker.options.staticPath) {
        apiMocker.express.use(apiMocker.options.staticPath, express.static(apiMocker.options.staticDirectory));
    }

    apiMocker.expressInstance = apiMocker.express.listen(port);
    apiMocker.log("Mock server listening on port " + port);
    return apiMocker;
};

apiMocker.stop = function () {
    if (apiMocker.expressInstance) {
        apiMocker.log("Stopping mock server.");
        apiMocker.expressInstance.close();
    }
    return apiMocker;
};

// expose all the "public" methods.
exports.createServer = apiMocker.createServer;
exports.start = apiMocker.start;
exports.setConfigFile = apiMocker.setConfigFile;
exports.stop = apiMocker.stop;


/** ** starting it on node ** */
var commander = require("commander")
commander.option("-c, --config <path>", "Path to config.json file.", __dirname + "/config.json")
    .option("-q, --quiet", "Disable console logging")
    .option("-p, --port <port>", "Port that the http mock server will use. Default is 8888.", "8888")
    .parse(process.argv);

var options = {};
options.port = commander.port;
options.quiet = !!commander.quiet;
var apiMocker = apiMocker.createServer(options)
    .setConfigFile(commander.config)
    .start();