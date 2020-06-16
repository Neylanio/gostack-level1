const express = require('express');
const { response } = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: "Hello World" });
    // return response.send("Hello World");
});


app.listen(3000, () => {
    console.log("Back-end started!");
});