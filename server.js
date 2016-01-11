var serverFactory   = require('spa-server'),
    open            = require('open'),
    _fs             = require('fs'),
    mkdirp          = require('mkdirp'),
    uglyfyJS        = require('uglify-js'),
    srcJsFile       = require('./config-js.json');

var FILE_ENCODING = 'utf-8',
    EOL = '\n';

var server = serverFactory.create({
    path: './www/',
    port: 8001,
    fallback: {
        'text/html' : '/index.html'
    }
});

function concat() {
    var distPath = 'www/js/app.js';
    var out = srcJsFile.src.map(function(filePath){
        return _fs.readFileSync(filePath, FILE_ENCODING);
    });

    mkdirp('./www/js', function (err) {
        if (err) {
            console.error(err);
        } else {
            _fs.writeFileSync(distPath, out.join(EOL), FILE_ENCODING);

            var result = uglyfyJS.minify(distPath, {
                mangle: true,
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true
                }
            });

            _fs.writeFileSync('www/js/app.mini.js', result.code);
        }
    });
}

concat();
server.start();
open("http://localhost:8001/", "chrome");
 