const leagueData = require('../../../csv/leagueData')
const playersData = require('../../../data')

const createLeague = (knex, league) => {
  console.log('league', league)
  return knex('leagues').insert({
    league: league.league,
    sport_name: league.sport
  }, 'id')
    .then(leagueId => {
      let playerPromises = []

      playersData.forEach(player => {
        
        if (player.league === league.league) {
          playerPromises.push(
            createPlayer(knex, {
              first_name: player.first_name,
              last_name: player.last_name,
              team: player.team,
              league_id: leagueId[0]
            })
          )
        }
      })

      return Promise.all(playerPromises)
    })
}

const createPlayer = (knex, player) => {
  console.log('player', player)
  return knex('players').insert(player)
}


exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('players').del()
   .then(() => knex('leagues').del())
   .then(() => {
     let leaguePromises = []

     leagueData.forEach(league => {
       leaguePromises.push(createLeague(knex, league))
     })

     return Promise.all(leaguePromises)
   })

   .catch(error => console.log(`Error seeding data: ${error}`))
};