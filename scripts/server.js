var shell = require('shelljs');
var argv = require('yargs').argv;
var browserSync = require('browser-sync');
var config;

if (argv.env && argv.env === 'dist') {
    config = {
        logConnections: true,
        online: false, // reduce start-up time
        startPath: '/',
        server: {
            baseDir: 'dist',
            routes: {
                '/src': 'src'
            }
        },
        browser: 'Google Chrome'
    };
} else {
    config = {
        logConnections: true,
        online: false, // reduce start-up time
        startPath: '/',
        server: {
            baseDir: ['.tmp', 'src'],
            routes: {
                '/.tmp/index.css': '.tmp/index.css',
                '/jspm_packages': 'jspm_packages',
                '/config.js': 'config.js',
                '/src': 'src',
            }
        },
        files: [
            '.tmp/index.css',
            'src/assets/images/**/*',
            {
                match: ['src/styles/**/*.scss'],
                fn: function(event, file) {
                    if (event === 'change') {
                        changeHandler(file, 'npm run styles:dev -s', { noReload: true });
                    }
                }
            },
            {
                match: ['src/**/*.js'],
                fn: function(event, file) {
                    if (event === 'change') {
                        changeHandler(file, 'npm run lint:js -s');
                    }
                }
            },
            {
                match: ['src/**/*.html', '!src/index.html'],
                fn: function(event, file) {
                    if (event === 'change') {
                        changeHandler(file, 'npm run copy:html -s');
                    }
                }
            },
            {
                match: ['src/index.html'],
                fn: function(event, file) {
                    if (event === 'change') {
                        changeHandler(file, 'npm run inject:js:dev -s');
                    }
                }
            }
        ],
        browser: 'Google Chrome'
    };
}

browserSync.init(config);

function changeHandler(file, command, options) {
    var opts = options || {};
    console.log('Changed: ', file);
    shell.exec(command, function() {
        if(!opts.noReload) {
            browserSync.reload();
        }
    });
}
