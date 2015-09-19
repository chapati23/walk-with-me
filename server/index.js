var Hapi   = require('hapi'),
    Inert  = require('inert'),
    Bcrypt = require('bcrypt');
    Basic  = require('hapi-auth-basic'),
    Config = require('./config/app'),
    users  = require('./models/user');

// Create a server with a host and port
var server = new Hapi.Server();

//Register Inert
server.register(Inert, function () {});

//Server config
server.connection(Config[process.env.NODE_ENV]);

var validate = function (request, username, password, callback) {
  var user = users[username];
  if (!user) {
    return callback(null, false);
  }

  Bcrypt.compare(password, user.password, function (err, isValid) {
    callback(err, isValid, { id: user.id, name: user.name });
  });
};

server.register(Basic, function (err) {
  server.auth.strategy('simple', 'basic', { validateFunc: validate });
  server.route({
    method: 'GET',
    path: '/{param*}',
    config: {
      auth: 'simple',
      handler: {
        directory: {
          path: 'client/dist'
        }
      }
    }
  });

  server.start(function () {
    console.log('server running at: ' + server.info.uri);
  });
});
