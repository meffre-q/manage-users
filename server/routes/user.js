const User = require('../handlers/user');

exports.route = (route) => {
    route('GET', '/user', {
        handler: User.getAll,
    });

    route('GET', '/user/{username}', {
        handler: User.getOne,
    });

    route('POST', '/user', {
        handler: User.create,
    });

    route('PUT', '/user/{username}', {
        handler: User.update,
    });

    route('DELETE', '/user/{username}', {
        handler: User.remove,
    });
};
