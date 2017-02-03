require('ts-node/register');
var helpers = require('./helpers');
var browserstack = require('browserstack-local');

const PROXY_PROTOCOL = 'http';
const PROXY_HOST = 'webproxy.wlb2.nam.nsroot.net';
const PROXY_PORT = 8080;

exports.config = {

  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',

  webDriverProxy: PROXY_PROTOCOL + '://' + PROXY_HOST + ':' + PROXY_PORT,

  baseUrl: 'http://localhost:3000/',

  // use `npm run e2e`
  specs: [
    helpers.root('src/**/**.e2e.ts'),
    helpers.root('src/**/*.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  
  commonCapabilities: {
    'project': 'statements',
    'build': 'statements-1.0.0',
    'browserstack.user': 'BROWSERSTACK_USERNAME',
    'browserstack.key': 'BROWSERSTACK_ACCESS_KEY',
    'browserstack.local': 'true',
    'browserstack.debug': 'true',
  },

  multiCapabilities: [{
    'name': 'Chrome Test',
    'browserName': 'Chrome'
  },{
    'name': 'Firefox Test',
    'browserName': 'Firefox'
  },{
    'name': 'Safari Test',
    'browserName': 'Safari'
  }],

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
   useAllAngular2AppRoots: true,

  //Code to start browserstack local before start of test
  beforeLaunch: function(){
    console.log("Connecting local");
    return new Promise(function(resolve, reject){
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({
                              'key': exports.config.commonCapabilities['browserstack.key'], 
                              'proxyHost': PROXY_HOST,
                              'proxyPort': PROXY_PORT
                            }, function(error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  afterLaunch: function(){
    return new Promise(function(resolve, reject){
      exports.bs_local.stop(resolve);
    });
  }

};


// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});