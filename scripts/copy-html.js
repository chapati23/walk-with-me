var copy = require('recursive-copy');

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

copyHTML();
