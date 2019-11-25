const express = require('express') //imports express
const app = express() //invokes express for us to be able to use it
const environment = process.env.NODE_ENV || 'development' //sets our environment for the application to run in. If something else isn't specifying the environment, use the development environment
const configuration = require('./knexfile')[environment] //importing in the knexfile and assigning the environment dynamically to the result of the previous line (knexfile is an object of objects, so telling it which object to look at)
const database = require('knex')(configuration) //use knex at our configuration (result of our environment and config variables) to make our database


app.set('port', process.env.PORT || 3000) //if there isn't another port environment assigned, run on port 3000
app.use(express.json()) //json our request bodies 
app.locals.title = "Sports' One Hit Wonders" //app.locals is an object that comes with express, giving the title property a value that is locally available to us

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')} `)
})
//listens for connections on the port we assigned up at app.set('port). gets our server going

//tells our app how to handle a GET request to the route '/', and then our handler callback function tells the app to respond with the string "Sports Greatest One Hit Wonders"
app.get('/', (request, response) => {
  response.send("Sports' Greatest One Hit Wonders!")
})

//Handles a GET request for all the leagues
app.get('/api/v1/leagues', (request, response) => {
  database('leagues').select() //goes to the "leagues" database and selects it
    .then((leagues) => {
      response.status(200).json(leagues) //sets a successful response of 200 and returns all of the json'd leagues in the database
    })
    .catch((error) => {
      response.status(500).json({ error }) //if the GET fails due to server-side error, send back a 500 status code and json the error property on the error object
    })
})

//handles a GET request for all the players
app.get('/api/v1/players', (request, response) => {
  database('players').select() //goes to our database and selects the "players" table
    .then((players) => {
      response.status(200).json(players) //if the request is successful, return a status code of 200 indicating so and return the json'd (new word) the players
    })
    .catch(error => {
      response.status(500).json({ error }) //if the request is not successful due to an internal server error, return a 500 status code indicating as such as well as the error property on the error object
    })
})

//handles a GET request for a specific league by ID
app.get('/api/v1/leagues/:id', (request, response) => {
  database('leagues').where('id', request.params.id).select() //goes into the leagues database, looks at the IDs and searches for an ID that matches the ID passed in with the request
    .then(leagues => {
      if (leagues.length) { //if the result of the 'where' is successful, we will have an array of at least one item, so length should be truthy
        response.status(200).json(leagues) //return a status of 200 to indicate success and the json'd leagues that match our condition
      } else {
        response.status(404).json({
          error: `Could not find league with id ${request.params.id}` //if we don't return a matching league (so no length) return a 404 status code to indicate not found and a string to indicate that there is not a league with that matching ID
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error }) //if there is an internal server-side error, return 500 status code to indicate as such and the error property on the error object
    })
})

//GET request for a player by ID
app.get('/api/v1/players/:id', (request, response) => {
  database('players').where('id', request.params.id).select() //goes into the players database, looks at the IDs and searches for an ID that matches the ID passed in with the request
    .then(players => {
      if (players.length) { //if the result of the 'where' returns a matching ID, we will have an array of minimum one item, so length is a truthy statement
        response.status(200).json(players) //return a 200 status to indicate success and the json'd player
      } else {
        response.status(404).json({
          error: `Could not find player with id ${request.params.id}` //if length is not truthy, send back a 404 status to indicate nothing was found matching the query and a string to indicate the same
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error }) //if there is an internal server error, return a 500 status code to indicate as much and the error property on the error object to make this clear
    })
})

//tells app how to handle a POST request for a league
app.post('/api/v1/leagues', (request, response) => {
  const league = request.body //assigns the body of the request to the variable league

  for (let requiredParameter of ['league', 'sport_name']) { //specifies that the required parameters for a successful request are 'league' and 'sport_name'
    if (!league[requiredParameter]) { //if the league variable from the request body is missing a required parameter defined on the line previous
      return response
        .status(422) //return a response with a status 422, unprocessable entity
        .send({ error: `Expected format: { league: <string>, sport_name: ><String>}. You're missing a "${requiredParameter}" property.`}) //send back a string indicating the data types each required parameter must be as well as what parameter is missing from the request
    }
  }

  database('leagues').insert(league, 'id') //if we're not missing a parameter, go into the league database and insert a new league and return the ID out of the insert function (which happens in the seed file?)
    .then(league => {
      response.status(201).json({ id: league[0] }) //send back a successful response and return the ID that was just assigned to the league that was inserted. in this request we get back an array of one value, the ID (so leage[0]) is the ID
    })
    .catch(error => {
      response.status(500).json({ error }) //if there is an internal server error, return a 500 status code to indicate as much and the error property on the error object to make this clear
    })
})


//tells app how to handle a POST request for a player
app.post('/api/v1/players', (request, response) => {
  const player = request.body //assigns the body of the request to the variable player
  
  for (let requiredParameter of ['first_name', 'last_name', 'league_name', 'team']) { //defines required parameters of first_name, last_name, league_name, and team for the request
    if (!player[requiredParameter]) { //if the player variable from the request body is missing a required parameter defined on the previous line...
      return response
        .status(422) //return a 422 response indicating unprocessable entity
        .send({ error: `Expected format: first_name: <string>, last_name: <string>, league_name: <string>, team: <string>. You're missing a "${requiredParameter}" property.`}) //also send a string listing the required parameters and their required datatypes, and interpolate what is missing
    }
  }

  database('players').insert(player, 'id') //if we're not missing a parameter, go into the players database, perform the insertion of a new player and return the ID 
    .then(player => {
      response.status(201).json({ id: player[0] }) //return status of 201 to indicate success and the ID that resulted from the insertion of the player (json'd)
    })
    .catch(error => {
      response.status(500).json({ error }) //if there is an internal server error, return a 500 status code to indicate as much and the error property on the error object to make this clear
    })
})

//tells app how to handle deleting a player by specific id
app.delete('/api/v1/players/:id', (request, response) => {
  const { id } = request.params //destructures the ID off of the request parameters

  database('players') //go into the players database
    .where({ id: id }) //find where the ID of the player matches the ID of the request (destructured request parameters)
    .del() //built in delete function
    .then(player => {
      response.status(201).json({ id }) //if this works, send back a successful response as well as the ID of the deleted player
    })
    .catch(error => {
      response.status(422).json({ error }) //if there is an internal server error, return a 500 status code to indicate as much and the error property on the error object to make this clear
    })
})

