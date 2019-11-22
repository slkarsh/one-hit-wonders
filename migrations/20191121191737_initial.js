
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('leagues', (table) => {
      table.increments('id').primary();
      table.string('league')
      table.string('sport_name')

      table.timestamps(true, true)

    }),

    knex.schema.createTable('players', (table) => {
      table.increments('id').primary()
      table.integer('league_id').unsigned();
      table.foreign('league_id')
        .references('leagues.id');
      table.string('first_name')
      table.string('last_name')
      table.string('team')

      table.timestamps(true, true)
    })
  ])
  
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('players'),
    knex.schema.dropTable('leagues')
  ])
  
};
