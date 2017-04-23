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

// pg.defaults.ssl = true;
// pg.connect(process.env.DATABASE_URL, function(err, client) {
//     if (err) throw err;
//     console.log('Connected to postgres! Getting schemas...');

//     client
//         .query('SELECT table_schema,table_name FROM information_schema.tables;')
//         .on('row', function(row) {
//             console.log(JSON.stringify(row));
//         });
// });

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