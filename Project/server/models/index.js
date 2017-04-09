'use strict';

var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    basename = path.basename(module.filename),
    env = process.env.NODE_ENV || 'development',
    config = require(__dirname + '/../config.json')[env],
    db = {};

var sequelize = new Sequelize("postgres://TongHuuLoc:1111@localhost/g05-goof");

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
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

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;