const http = require('http');
const todos = require('./data/todos');

http.createServer((request, response) => {
    if (request.url === '/todos') {
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        response.end(JSON.stringify(todos));
    } else if (request.url === '/todos/completed') {
        const completed = todos.filter(todo => todo.completed);
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        response.end(JSON.stringify(completed));
    } else if (request.url.match(/\/todos\/\d+/)) {
        const id = parseInt(request.url.replace(/\D+/, ''));

        const todo = todos.find(todo => todo.id === id);

        if (!todo) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('Not found');
        } else {
            response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            response.end(JSON.stringify(todos));
        }    
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Not found');
    }
}).listen(3000, () => console.log("Server running at http://127.0.0.1:3000/"));