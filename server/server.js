const Hapi = require('hapi');

const Routes = require('./routes');
const Config = require('./config/config');

const server = new Hapi.Server();

server.connection({
    port: Config.server.port,
    routes: {
        cors: true,
    },
});

server.register({
    register: Routes,
})
.catch((err) => {
    console.error('Routes registration error: ', err);
})
.then(() => {
    server.on('response', (req) => {
        console.info(`${req.info.remoteAddress}: ${req.method.toUpperCase()} ${req.url.path} --> ${req.response.statusCode}`);
    });
    server.on('route', (route) => {
        console.info(`${route.method}\t${route.path}`);
    });
})
.then(() => server.start())
.catch((err) => {
    console.error('Server error: ', err);
})
.then(() => {
    console.info(`Server running at: ${server.info.uri}`);
});
