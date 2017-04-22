'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    var Accounts = sequelize.define('Accounts', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        region: DataTypes.INTEGER,
        subscribe: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        classMethods: {
            validPassword: function(password, passwd, done, user) {
                bcrypt.compare(password, passwd, function(err, isMatch) {
                    if (err) console.log(err)
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                });
            }
        }
    }, {
        dialect: 'postgres'
    });

    Accounts.hook('beforeCreate', function(user, options, fn) {
        var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            return salt
        });
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            return fn(null, user)
        });

    });

    Accounts.hook('beforeUpdate', function(user, options, fn) {
        var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            return salt;
        });
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            return fn(null, user)
        });

    });

    return Accounts;
};