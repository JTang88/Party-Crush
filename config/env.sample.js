// root configuration file
module.exports = {
  /**
   *
   *  Local / Development
   *
   *  @url {NA}
   */
  development: {
    defaults: {
      NODE_ENV: 'DEVELOPMENT',
      DEBUG: 'TRUE'
    },
    directories: {
      'client': {
        _envPrefix: 'REACT_APP_',
        https: true,
        facebook_app_id: 'insert appId here',
      },
      'rest-server': {
        host: 'http://localhost',
        port: '3112',
        mongo_host: 'mongodb://localhost',
        mongo_db_name: 'party-crush',
        mongo_port: 27017,
        token_secret: 'insert secret here'
      },
      'socket-server': {
        host: 'http://localhost',
        port: '3113'
      }
    }
  }
};