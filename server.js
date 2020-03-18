var http = require("http")

function procPerson(request, response) {
    var person = {
        "firstname": "Post",
        "lastname": "Response",
        "getFullName": function() {
            return this.firstname + ' ' + this.lastname;
        }
    };
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(person));
    response.end();
}

function procStix(request, response) {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    request.on('end', () => {
        var daStix = JSON.parse(body)
        const {type, id, objects} = daStix
        console.log('type:', type)
        console.log('id:', id)
        for (obj of objects) {
            const {type, id, name, description} = obj
            console.log('  object:\n    type:', type)
            console.log('    id:', id)
            console.log('    name:', name)
            console.log('    description:', description)
        }
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(daStix));
        response.end();
    });
}

function processPost(request, response) {
    console.log('Processing post request here ...');
    const {headers, method, url } = request;
    // console.log('headers:', headers)
    // console.log('method:', method)
    // console.log('url:', url)
    if (url === '/person') {
        procPerson(request, response)
    } else if (url === '/stix') {
        procStix(request, response)
    } else {
        response.writeHead(500, {"Content-Type": "test/plain"});
        response.write("*** ERROR ***");
        response.end();
    }
    
}

http.createServer(function(request, response) {
    if (request.method === 'POST') {
        processPost(request, response)
    } else {
        console.log("call received!");
        var person = {
            "firstname": "Brad",
            "lastname": "Short",
            "getFullName": function() {
                return this.firstname + ' ' + this.lastname;
            }
        };
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(person));
        response.end();
    }
}).listen(9999);