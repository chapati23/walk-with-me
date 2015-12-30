var argv = require('yargs').argv;
var copy = require('recursive-copy');

function copyRootAssets() {
    copy('src', 'dist', {
        filter: ['*.*', '!*.html', '!*.js'],
        overwrite: true
    })
    .then(function() {
        console.info('Assets copied!');
    })
    .catch(function(error) {
        console.error('Failed to copy assets: ' + error);
    });
}

function copyHTML() {
    copy('src/sections', 'dist/sections', {
        filter: '*.html',
        overwrite: true
    })
    .then(function() {
        console.info('HTML succesfully copied');
    })
    .catch(function(error) {
        console.error('Failed to copy HTML: ' + error);
    });
}

if (argv.assets) {
    copyRootAssets();
}

if (argv.html) {
    copyHTML();
}
