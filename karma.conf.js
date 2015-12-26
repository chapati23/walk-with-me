// Karma configuration
// Generated on Wed Nov 18 2015 16:49:53 GMT+0100 (CET)

module.exports = function(config) {
    config.set({
        urlRoot: '/',

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.',

        // list of files / patterns to load in the browser
        files: [ ],

        // list of files to exclude
        exclude: [  ],
        // exclude: [ 'jspm_packages/**/*.js' ],

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jspm', 'jasmine'],

        // plugins to use
        plugins: [
            'karma-jspm',
            'karma-coverage',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher'
        ],

        jspm: {
            loadFiles:  [
                'src/**/*.spec.js'
            ],
            serveFiles: [ 'src/**/!(*.spec).js' ],
            paths: {
                "github:*": "base/jspm_packages/github/*",
                "npm:*": "base/jspm_packages/npm/*",
                "bower:*": "base/jspm_packages/bower/*"
            }
        },

        // systemjs: {
        //     configFile: 'config.js',
        //     config: {
        //         transpiler: 'babel',
        //         packages: 'jspm_packages',
        //         paths: {
        //             "systemjs": "/base/jspm_packages/system.js",
        //             "github:*": "/base/jspm_packages/github/*",
        //             "npm:*": "/base/jspm_packages/npm/*",
        //             "bower:*": "/base/jspm_packages/bower/*",
        //             'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js',
        //             'systemjs': 'node_modules/systemjs/dist/system.js',
        //             'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
        //             'babel': 'node_modules/babel-core/browser.js',
        //             'phantomjs-polyfill': 'node_modules/phantomjs-polyfill/bind-polyfill.js',
        //         }
        //     },
        //
        //     serveFiles: [ 'src/**/!(*.spec).js' ]
        // },

        proxies: {
            '/src/': '/base/src/',
            '/jspm_packages': '/base/jspm_packages'
        },

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // browsers: ['Chrome', 'Firefox', 'Safari'],
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    })
}
