const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();
//Allow anyelse front-end can acess
app.use(cors());
app.use(express.json());


/**
 * HTTP Methods
 * 
 * GET: show all
 * POST: create
 * PUT/PATCH: update all or especific element
 * DELETE: destroy especific element
 */


/**
 * Parameters types
 * 
 * Query params: Filters and pagination, ex: ?page=2
 * Route params: Identify resources (UPDATE, DELETE)
 * Request body: Body to create or to delete resource (JSON)
 * 
 */


 /**
  * Middleware: Requisition interceptor, it can completly stop request or change the request data
  */

const repositories = [];

// //GET with Route params
// app.get('/repositories/:title', (request, response) => {

//     const { title } = request.params;

//     return repositories.find(item => item == title) 
//             ? response.json(repositories) 
//             : response.status(404).json({message: "Not Found Element"});

// });


// Common GET 
// app.get('/repositories', (request, response) => {
//     return response.json(repositories);
// });

function logResquests(request, response, next){
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] - ${url}`;

    return next();
}

function validateRepositoryId (request, response, next){

    const { id } = request.params;

    if(!isUuid(id)){
        return response.status(400).json({ error: "Invalid repository ID" })
    }
    
    return next();

}

app.use(logResquests);

app.use("/repositories/:id", validateRepositoryId);


// //GET with Query params
app.get('/repositories', (request, response) => {

    const { title } = request.query;

    const results = title 
                    ? repositories.find(respository => respository.title.includes(title)) 
                    : repositories;

    return response.json(results);

});

app.post('/repositories', (request, response) => {

    const { title, owner } = request.body;

    const respository = { id: uuid(), title, owner }; 

    repositories.push(respository);

    return response.status(200).json(respository);
});

app.put('/repositories/:id', (request, response) => {

    const { id } = request.params;
    const { title, owner } = request.body;

    const respositoryIndex = repositories.findIndex(respository => respository.id == id);

    if(respositoryIndex < 0){
        return response.status(400).json({message: "Respository Not Found"});
    }
        
    const repository = {
        id,
        title,
        owner
    };

    repositories[respositoryIndex] = repository;
    
    return response.status(200).json(respository);

});

app.delete('/repositories/:id', (request, response) => {

    const { id } = request.params;

    const respositoryIndex = repositories.findIndex(repository => repository.id == id);

    if(respositoryIndex < 0){
        return response.status(404).json({message: "Respository Not Found"});
    }

    repositories.splice(respositoryIndex, 1);

    return response.status(204).send();

});


app.listen(3333, () => {
    console.log("🚀Back-end started!");
});