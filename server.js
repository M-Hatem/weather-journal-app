// Setup empty JS object to act as endpoint for all routes
// I used an array for the endPoint variable so that i can use the PUSH method to add the data to that array
// Array is a special kind of object
projectData = {};

// After installing express we need to invoke it in the server by using require
const express = require('express')
// After that we need to make an instance called app for the express we already invoked
const app = express()
// After installing body-parser we require it too
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// we need also to install cors middleware then require it too
const cors = require('cors')
// We need to use .use function to add cors to express
app.use (cors())


// Creating a port to use and it will be 8000 or 3000 or 3030 or 8080 as mentioned in the course
const port = 3000;
// Spin up the server 
const server = app.listen(port, function() {
   console.log(`The Server is Running on a localHost : ${port}`)
});

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
// Making a GET route

app.get ('/all', function(req, res)
{
   // res.send to send the data we got from POST method to the browser
   res.send(projectData)
   // To reset data after sending it to the browser so that it won't be cumulative data
   projectData = {};
});


// Making a POST route
app.post ('/addData', saveData)

function saveData (req, res) {
// now we got more than one input to add so we make an object called newEntry to dynamically add data,temp and content to the object API endpoint (projectData)
   let newEntry = {
      date: req.body.date,
      temp: req.body.temp,
      content: req.body.content,
      country: req.body.country,
      town: req.body.town,
   };
   // and now we add newEntry object to projectData object to be viewed to the client through GET route
   projectData = newEntry;
};