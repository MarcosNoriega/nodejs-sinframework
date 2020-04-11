const http = require('http');
const {bodyParse} = require('./lib/bodyParse');

let database = []

function getTasks(res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(database));
    res.end();
}

async function createTasks(req, res) {
    try {
        await bodyParse(req);
        console.log(req.body);
        database.push(req.body);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(database));
        res.end();
    } catch (error) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write("datos invalidos");
        res.end();
    }
}

async function updateTasks(req, res) {
    try {
        let {url} = req;

        let idQuery = url.split("?")[1];
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];
        
        if (idKey = "id") {
            await bodyParse(req);

            database[idValue - 1] = req.body;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(database));
            res.end();
            
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("consulta invalida");
            res.end();
        }

    

    } catch (error) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write("datos invalidos");
        res.end();
    }
}

function deleteTasks(req, res) {
    try {
        let {url} = req;

        let idQuery = url.split("?")[1];
        let idKey = idQuery.split("=")[0];
        let idValue = idQuery.split("=")[1];

        if (idKey = "id") {
            database.splice(idValue - 1, 1);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(database));
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("consulta invalida");
            res.end();
        }

    } catch (error) {
         res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write("datos invalidos");
        res.end();
    }
}

const server = http.createServer((req, res) => {
    const {url, method} = req;

    console.log('url: ' + url + ' method: ' + method);

    /*res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('reseived');
    res.end();*/

    switch(method) {
        case 'GET':
            if (url === '/') {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'hello world'}));
                res.end();
            }

            if (url === '/tasks') {
                getTasks(res);
            }
            break;
        case 'POST':
            if (url === '/tasks') {
                createTasks(req, res);
            }
            break;
        case 'PUT':
            updateTasks(req, res);
            break;
        case 'DELETE':
            deleteTasks(req, res);
            break;

    }

    

});

server.listen(3000);

console.log('server on port', 3000);