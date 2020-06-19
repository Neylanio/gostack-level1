const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

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

const projects = [];

// //GET with Route params
// app.get('/projects/:title', (request, response) => {

//     const { title } = request.params;

//     return arr.find(item => item == title) 
//             ? response.json(arr) 
//             : response.status(404).json({message: "Not Found Element"});

// });


// Common GET 
// app.get('/projects', (request, response) => {
//     return response.json(projects);
// });

function logResquests(request, response, next){
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] - ${url}`;

    return next();
}

function validateProjectId (request, response, next){

    const { id } = request.params;

    if(!isUuid(id)){
        return response.status(400).json({ error: "Invalid project ID" })
    }
    
    return next();

}

app.use(logResquests);

app.use("/projects/:id", validateProjectId);


// //GET with Query params
app.get('/projects', (request, response) => {

    const { title } = request.query;

    const results = title 
                    ? projects.find(project => project.title.includes(title)) 
                    : projects;

    return response.json(results);

});

app.post('/projects', (request, response) => {

    const { title, owner } = request.body;

    const project = { id: uuid(), title, owner }; 

    projects.push(project);

    return response.status(200).json(project);
});

app.put('/projects/:id', (request, response) => {

    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0){
        return response.status(400).json({message: "Project Not Found"});
    }
        
    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;
    
    return response.status(200).json(project);

});

app.delete('/projects/:id', (request, response) => {

    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0){
        return response.status(404).json({message: "Project Not Found"});
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();

});


app.listen(3333, () => {
    console.log("🚀Back-end started!");
});