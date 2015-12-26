var fs = require('fs')

fs.readFile('src/index.html', 'utf8', function (err, data) {
    if (err) {
        return console.error('Error: ', err);
    }

    var result = data.replace(/<!-- inject:js -->/g, '\n\t<script src="app.bundle.js"></script>\n');

    fs.writeFile('dist/index.html', result, 'utf8', function (writeErr) {
        if (writeErr) return console.error('Error: ', writeErr);
    });
});
