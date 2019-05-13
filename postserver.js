const http = require('http');
const fs = require('fs');
const path = require('path');

function parseBody(body) {
    //username=dreik&password=1234
    const resault = {};
    const keyValuePairs = body.split('&'); //['username=dreik', 'password=1234']

    keyValuePairs.forEach(keyValue => {
        const [key, value] = keyValue.split('='); //['username', 'dreik']
        resault[key] = value; // {'username': 'dreik'}
    });

    return resault;
}

http.createServer(function (request, response) {
    switch (request.method) {
        case 'GET':
            const stream =fs.createReadStream(path.join(__dirname, 'public', 'form.html'));
            response.writeHead(200, {'Content-Type': 'text/html'});
            stream.pipe(response);
            break;

        case 'POST':
                let body = '';

                request.setEncoding('utf-8');
                request.on('data', data => body += data);
                request.on('end', () => {
                    const data = parseBody(body);

                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify(data));

                });
            break;
    
        default:
            break;
    }
}).listen(3000, () => console.log('Server running at http://127.0.0.1:3000/'));