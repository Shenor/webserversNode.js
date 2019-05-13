const http = require('http');
const fs = require('fs');
const path = require('path');


function handleError(error, res) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(error.message);
}

http.createServer((req, res) => {
    if (req.url === "/") {
            const stream = fs.createReadStream(path.join(__dirname, 'public', 'index.html'));
            stream.on('error', error => handleError(error, res));
            res.writeHead(200, { 'Content-Type': 'text/html' });
            stream.pipe(res);
    } else if (req.url.match(/.css$/)) {
            const stream = fs.createReadStream(path.join(__dirname, 'public', req.url));
            stream.on('error', error => handleError(error, res));
            res.writeHead(200, { 'Content-Type': 'text/css' });
            stream.pipe(res);
    } else if (req.url.match(/.js$/)) {
            const stream = fs.createReadStream(path.join(__dirname, 'public', req.url));
            stream.on('error', error => handleError(error, res));
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            stream.pipe(res);
    } else if (req.url.match(/.png$/)) {
            const stream = fs.createReadStream(path.join(__dirname, 'public', req.url));
            stream.on('error', error => handleError(error, res));
            res.writeHead(200, { 'Content-Type': 'text/png' });
            stream.pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("404 не найдено");
    }
}).listen(3000, console.log('Сервер запущен!'));