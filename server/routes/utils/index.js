exports.addRoute = (server, file) => {
    const route = (method, path, options) => {
        const tmp = Object.assign({}, options);
        tmp.method = method;
        tmp.path = path;
        tmp.handler = tmp.handler.handler;
        server.route(tmp);
    };
    file.route(route);
};
