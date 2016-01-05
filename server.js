var serverFactory   = require('spa-server'),
    open            = require('open');

var server = serverFactory.create({
    path: './www/',
    port: 8001,
    fallback: {
        'text/html' : '/index.html'
    }
});

server.start();
open("http://localhost:8001/", "chrome");
 