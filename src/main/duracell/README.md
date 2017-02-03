# change directory to our repo
cd PROJECT_NAME

# install the dependencies with npm
npm install

# install angular2-nexus-uiux dependency into node_modules folder
ans install

# start the server
npm start

# use Hot Module Replacement
npm run server:dev:hmr

go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

# start the mock api server
cd PROJECT_NAME/mock_api_server
npm install
node api_server.js

the mock server will be running in http://localhost:7878

# Generate HTML documentation
npm run docs

Then open PROJECT_NAME/doc/index.html


# Table of Contents
* [File Structure](#file-structure)
* [Getting Started](#getting-started)
* [Configuration](#configuration)
* [Support, Questions, or Feedback](#support-questions-or-feedback)

## File Structure
We use the component approach in our starter. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```
PROJECT_NAME/
 ├──config/                    * our configuration
 |   ├──helpers.js             * helper functions for our configuration files
 |   ├──spec-bundle.js         * ignore this magic that sets up our angular 2 testing environment
 |   ├──karma.conf.js          * karma config for our unit tests
 |   ├──protractor.conf.js     * protractor config for our end-to-end tests
 │   ├──app-config.dev.js      * our development application config. Properties can be accessed using AppConfigService.
 │   ├──app-config.prod.js     * our production application config. Properties can be accessed using AppConfigService.
 │   ├──app-config.test.js     * our testing application config. Properties can be accessed using AppConfigService.
 │   ├──webpack.dev.js         * our development webpack config
 │   ├──webpack.prod.js        * our production webpack config
 │   └──webpack.test.js        * our testing webpack config
 │
 ├──src/                       * our source files that will be compiled to javascript
 |   ├──main.browser.ts        * our entry file for our browser environment
 │   │
 |   ├──index.html             * Index.html: where we generate our index page
 │   │
 |   ├──polyfills.ts           * our polyfills file
 │   │
 |   ├──vendor.ts              * our vendor file
 │   │
 │   ├──app/                   * WebApp: folder
 │   │   │
 │   │   │    
 │   │   ├──{SubAppGroup}/     * Sub App Group folder that contains SubApps, and the files specific to the group
 │   │   │    └──{SubApp}/     * SubApp folder that contains the files specific to the SubApp
 │   │   │ 
 │   │   ├──{SubApp}/          * SubApp at root level folder that contains the files specific to the SubApp
 │   │   │
 │   │   ├──app.module.ts          * Root module to be boostraped by the Angular Application
 │   │   ├──app-routing.module.ts  * Root Routing Module. Add routes to the SubAppGroups and the SubApps at root level
 │   │   ├──app.component.ts       * First component to be rendered.
 │   │   ├──app.spec.ts            * a simple test of components in app.ts
 │   │   ├──app.e2e.ts             * a simple end-to-end test for /
 │   │   └──app.ts                 * App.ts: a simple version of our App component components
 │   │
 │   ├──node_modules/          * Node Modules folder developed by Citi that will be used in the entire application
 │   │
 │   └──assets/                * static assets are served here
 │       ├──icon/              * our list of icons from www.favicon-generator.org
 │       ├──robots.txt         * for search engines to crawl your website
 │       └──humans.txt          * for humans to know who the developers are
 │
 │
 ├──tslint.json                * typescript lint config
 ├──typedoc.json               * typescript documentation generator
 ├──tsconfig.json              * config that webpack uses for typescript
 ├──package.json               * what npm uses to manage it's dependencies
 └──webpack.config.js          * webpack main configuration file
```

# Getting Started

## Running the app
After you have installed all dependencies you can now run the app. Run `npm run server` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://0.0.0.0:3000` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:3000/`).

### server
```bash
# development
npm run server
# production
npm run build:prod
npm run server:prod
```

## Other commands

### build files
```bash
# development
npm run build:dev
# production
npm run build:prod
```

### hot module replacement
```bash
npm run server:dev:hmr
```

### watch and build files
```bash
npm run watch
```

### run tests
```bash
npm run test
```

### watch and run our tests
```bash
npm run watch:test
```

### run end-to-end tests

```bash
#Open PROJECT_NAME/config/protractor.conf.js
#Edit:
const PROXY_PROTOCOL = '<proxy protocol>';
const PROXY_HOST = '<proxy host>';
const PROXY_PORT = <proxy port>;

exports.config = {
	...........
	baseUrl: '<webapp protocol>://<webapp host>:<webapp port>/',

	commonCapabilities: {
		...........
		'browserstack.user': '<browserstack user name>'
		'browserstack.key': '<browserstack access key>'
		...........
	}
	...........
}
```

```bash
# make sure you have your web app server running in another terminal
npm run e2e
```

# Configuration
Configuration files live in `config/` we are currently using webpack, karma, and protractor for different stages of your application

## Mock API Server configuration

Add the demo file in PROJECT_NAME/mock_api_server/responses/DEMO_FILE_NAME.json

Open PROJECT_NAME/mock_api_server/config.json

Add the configuration related to the demo response in the webServices section

```bash
"webServices": {
        "PATH": {
            "mockFile": "DEMO_FILE_NAME.json",
            "verbs": ["post"] //Comma separated http verbs supported for this demo
        }
}
```
# Typings
In order to install typings for your modules use:

npm install @types/{name} --save-dev

Go to http://microsoft.github.io/TypeSearch/ in order to search the existing types and find the types name

Add the name in the types section in the tsconfig.json and tsconfig-modules.json files.

# Support, Questions, or Feedback
> Contact us


