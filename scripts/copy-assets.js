var copy = require('recursive-copy');

// copy
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

copyRootAssets();
