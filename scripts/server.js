var shell = require('shelljs');
var argv = require('yargs').argv;
var browserSync = require('browser-sync');
var config;

if (argv.env && argv.env === 'build') {
    config = {
        startPath: '/',
        server: {
            baseDir: 'dist',
        },
        browser: 'Google Chrome'
    };
} else {
    config = {
        startPath: '/',
        server: {
            baseDir: ['.tmp', 'src'],
            routes: {
                '/jspm_packages': 'jspm_packages',
                '/config.js': 'config.js',
                '/src': 'src'
            }
        },
        files: [
            '.tmp/styles/index.css',
            'src/images/**/*',
            {
                match: ['src/styles/**/*.scss'],
                fn: function(event, file) {
                    changeHandler(file, 'npm run styles:dev -s', { noReload: true });
                }
            },
            {
                match: ['src/**/*.js'],
                fn: function(event, file) {
                    changeHandler(file, 'npm run js:lint -s');
                }
            },
            {
                match: ['src/**/*.html', '!src/index.html'],
                fn: function(event, file) {
                    changeHandler(file, 'npm run copy:html -s');
                }
            },
            {
                match: ['src/index.html'],
                fn: function(event, file) {
                    changeHandler(file, 'npm run js:inject:dev -s');
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
