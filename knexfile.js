// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/one_hit_wonders',
    migrations: {
      directory: './db/migrations'
    }, 
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullasDefault: true
  }                            
};
