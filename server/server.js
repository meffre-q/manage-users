const Hapi = require('hapi');

const Routes = require('./routes');
const Config = require('./config/config');

const server = new Hapi.Server();

server.connection({
  port: Config.server.port,
});

server.route(Routes.endpoints);

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
