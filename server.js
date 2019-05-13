const http = require('http');

const html = `
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="app.css">
    <title>Document</title>
</head>
<body>
    <center>
        <h1>Сервер на Node.js</h1>
        <button>Click</button>
    </center>
    <script src="app.js"></script>
</body>
</html>
`;
 const css = `
    body {
        margin: 0;
        padding: 0;
        text-align: center;
    }

    h1{
        margin: 0;
        margin-bottom: 30px;
        background-color: #43853d;
        color: white;
        font-family: 'Consolas';
        padding: 2rem;
    }
 `;
 const js = `
    
 `;

    http.createServer((req, res) => {
        switch(req.url){
            case '/':
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
            break;
            case '/app.js':
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(js);
            break;
            case '/app.css':
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(css);
            break;
            default:
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('404 не найдено');
        }
   
}).listen(3000, () => console.log('Сервер Работает!'));


// const server = http.createServer();

// server.on('request', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end("Основы Node js");
// });

// server.listen(3000, () => console.log('Сервер Работает!'));
