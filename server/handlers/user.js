const Boom = require('boom');
const Joi = require('joi');

const User = require('../models/user')
  .User;

exports.getAll = {
    handler(request, reply) {
        User.find({}, (err, user) => {
            if (err) {
                return reply(Boom.badImplementation(err));
            }
            return reply(user);
        });
    },
};

exports.getOne = {
    handler(request, reply) {
        User.findOne({
            username: request.params.username,
        }, (err, user) => {
            if (err) {
                return reply(Boom.badImplementation(err));
            }
            return reply(user);
        });
    },
};

exports.create = {
    validate: {
        payload: {
            username: Joi.string()
        .required(),
            password: Joi.string()
        .required(),
        },
    },
    handler(request, reply) {
        const user = new User(request.payload);
        user.token = '';
        user.item = [];
        user.settings.display = 10;
        user.save((err, username) => {
            if (err) {
                if (err.code === 11000 || err.code === 11001) {
                    return reply(Boom.forbidden('please provide another username, it already exist'));
                }
                return reply(Boom.forbidden(err));
            }
            return reply(username)
        .created(`/user/${username.username}`);
        });
    },
};

exports.update = {
    validate: {
        payload: {
            username: Joi.string()
        .min(3)
        .max(20)
        .required(),
        },
    },
    handler(request, reply) {
        User.findOne({
            username: request.params.username,
        }, (err, user) => {
            if (err) {
                return reply(Boom.badImplementation(err));
            }
            user.description = request.payload.description;
            user.save((error, username) => {
                if (error) {
                    if (error.code === 11000 || error.code === 11001) {
                        return reply(Boom.forbidden('please provide another username, it already exist'));
                    }
                    return reply(Boom.forbidden(error));
                }
                return reply(username)
          .updated(`/user/${username.username}`);
            });
            return 1;
        });
    },
};

exports.remove = {
    handler(request, reply) {
        User.findOne({
            username: request.params.username,
        }, (err, user) => {
            if (err) {
                return reply(Boom.badRequest('Could not delete user'));
            } else if (!err && !user) {
                return reply(Boom.notFound());
            }
            user.remove();
            return reply({
                message: 'User deleted successfully',
            });
        });
    },
};
