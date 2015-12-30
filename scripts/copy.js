var argv = require('yargs').argv;
var copy = require('recursive-copy');

function copyRootAssets() {
    copy('src', 'dist', {
        filter: ['*.*', '!*.html', '!*.js'],
        overwrite: true
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
