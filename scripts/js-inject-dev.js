var fs = require('fs')

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
