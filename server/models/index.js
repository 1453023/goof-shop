'use strict';

var fs = require('fs'),
    path = require('path'),
    pg = require('pg'),
    Sequelize = require('sequelize'),
    lodash = require('lodash'),
    basename = path.basename(module.filename),
    env = process.env.NODE_ENV || 'development',
    config = require(__dirname + '/../config.json')[env],
    db = {};

var sequelize = new Sequelize(process.env.DATABASE_URL);
// var sequelize = new Sequelize('postgres://wcjqncssmqvcxr:83a823875a97bd3eb39b9adef13ae306fd220a3c04905a95c66a475f7d761503@ec2-107-20-195-181.compute-1.amazonaws.com:5432/d5ml8t29skstei');

// if (config.use_env_variable) {
//     var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//     var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        if (file.slice(-3) !== '.js') return;
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db)