var argv = require('yargs').argv;
var fs = require('fs')

function injectBuild() {
    fs.readFile('src/index.html', 'utf8', function (err, data) {
        if (err) {
            return console.error('Error: ', err);
        }

        var result = data.replace(/<!-- inject:js -->/g, '\n\t<script src="app.bundle.js"></script>\n');

        fs.writeFile('dist/index.html', result, 'utf8', function (writeErr) {
            if (writeErr) return console.error('Error: ', writeErr);
        });
    });
}

function injectDev() {
    fs.readFile('src/index.html', 'utf8', function (err, data) {
        if (err) {
            return console.error('Error: ', err);
        }

        var scripts = '<script src="jspm_packages/system.js"></script>\
                       <script src="config.js"></script>\
                       <script>System.import("./app");</script>';

        var result = data.replace(/<!-- inject:js -->/g, scripts);

        fs.writeFile('.tmp/index.html', result, 'utf8', function (writeErr) {
            if (writeErr) return console.error('Error: ', writeErr);
        });
    });
}

if (argv.env === 'dev') {
    injectDev();
}

if (argv.env === 'build') {
    injectBuild();
}