const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const utils = require('./utils');

const routes = () => fs.readdirSync(__dirname)
    .filter(file => (file !== basename && file !== 'utils'))
    .map(file => require(path.join(__dirname, file)));

exports.register = (server, options, next) => {
    routes().forEach(file => utils.addRoute(server, file));
    next();
};

exports.register.attributes = {
    name: 'base',
};
