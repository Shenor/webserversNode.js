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

function render(template, data, done) {
    fs.readFile(path.join(__dirname, 'views', `${template}.view`), 'utf-8', (error, file) => {
        if (error) return done(error);

        let html = file;

        for (let prop in data) {
            const regex = new RegExp(`{${prop}}`, 'g');
            html = html.replace(regex, data[prop]); 
        }

        done(null, html);
    });
}

http.createServer((request, response) => {
    switch (request.method) {
        case 'GET':
            const stream = fs.createReadStream(path.join(__dirname, 'views', 'form.view'));
            response.writeHead(200, {'Content-Type': 'text/html'});
            stream.pipe(response);
            break;

        case 'POST':
            let body = '';

            request.setEncoding('utf-8');
            request.on('data', data => body += data);
            request.on('end', () => { 
                const data = parseBody(body);
                render('post', data, (error, html) => {
                    if (error) {
                        response.writeHead(500, {'Content-Type': 'text/plain'})
                       return response.end(error.message);
                    }

                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(html);
                })
            });
            break;
        default:
            break;
    }
}).listen(3000, () => console.log('Server running at http://127.0.0.1:3000/'));
