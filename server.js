var serverFactory   = require('spa-server'),
    open            = require('open'),
    _fs             = require('fs'),
    fileSystem       = require('file-system');

var server = serverFactory.create({
    path: './www/',
    port: 8001,
    fallback: {
        'text/html' : '/index.html'
    }
});


var FILE_ENCODING = 'utf-8',
    EOL = '\n';


function concat(opts) {
    fileSystem.recurse('./', ['app/**/app.module.js', 'app/**/*.provider.js', 'app/**/*.factory.js', 'app/**/*.service.js', 'app/**/*.filter.js', 'app/**/*.directive.js', 'app/**/*.module.js',  'app/**/*.js'], function(filepath, relative, filename) {
        if (filename) {
            console.log(filepath);
            console.log(relative);
            console.log(filename);
            console.log("==========");
        } else {
            console.log("++++++++");
            console.log(filepath);
            console.log(relative);
            console.log(filename);
        }
    });


    var fileList = opts.src;
    var distPath = opts.dest;
    var out = fileList.map(function(filePath){
        //return _fs.readFileSync(filePath, FILE_ENCODING);
        fileSystem.recurse('path', ['**/*.js'], function(filepath, relative, filename) {
            if (filename) {
                console.log(filepath);
                console.log(relative);
                console.log(filename);
                console.log("==========");
            } else {
                console.log(filepath);
                console.log(relative);
                console.log(filename);
            }
        });
    });

    _fs.writeFileSync(distPath, out.join(EOL), FILE_ENCODING);
    console.log(' '+ distPath +' built.');
}

concat({
    src : ['app/*.js'],
    dest : 'www/concatenatedFile.js'
});

//server.start();
//open("http://localhost:8001/", "chrome");
 