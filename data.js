const data = require('./csv/json-data.js')

const synthesizePlayers = () => {
  return data.reduce((acc, currentPlayer) => {
    if (currentPlayer.year_index === currentPlayer.peak_year_index) {
      acc.push(currentPlayer)
    }
    return acc
  }, [])
}


const fullPlayerData = synthesizePlayers();

const cleanPlayers = () => {
  return fullPlayerData.map(player => {
    const { name, sport_name, league, team } = player
    const splitName = name.split(' ')
    const first_name = splitName[0]
    const last_name = splitName[1]
    return { first_name, last_name, sport_name, league, team}
  })
}

const playerData = cleanPlayers();
console.log('player data', playerData.length)

module.exports = playerData;