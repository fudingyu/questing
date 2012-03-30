var fs = require('fs');

fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if (! err) {
        fs.writeFile(process.argv[2], JSON.stringify(JSON.parse(data), null, 2), 'utf8');
    }
});