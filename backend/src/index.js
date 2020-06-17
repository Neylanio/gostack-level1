const express = require('express');

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


const arr = [
    'Projeto 1',
    'Projeto 2'
];


// Common GET 
// app.get('/projects', (request, response) => {
//     return response.json(arr);
// });


// //GET with Query params
app.get('/projects', (request, response) => {

    const { title } = request.query;

    return arr.find(item => item == title) 
            ? response.json(arr) 
            : response.status(404).json({message: "Not Found Element"});

});


//GET with Route params
app.get('/projects/:title', (request, response) => {

    const { title } = request.params;

    return arr.find(item => item == title) 
            ? response.json(arr) 
            : response.status(404).json({message: "Not Found Element"});

});


app.post('/projects', (request, response) => {

    const { title } = request.body;

    arr.push(title);

    return response.json(arr);
});

app.put('/projects/:title', (request, response) => {

    const { title } = request.params;        
    const { content } = request.body;

    if(~arr.indexOf(title)){
        arr[arr.indexOf(title)] = content;   
        return response.json(arr);
    }else{
        return response.status(404).json({message: "Not Found Element"});
    }
});


app.delete('/projects/:title', (request, response) => {

    const { title } = request.params;

    if(~arr.indexOf(title)){
        delete arr[arr.indexOf(title)];
        return response.json(arr);
    }else{
        return response.status(404).json({message: "Not Found Element"});
    }

});


app.listen(3333, () => {
    console.log("Back-end started!");
});