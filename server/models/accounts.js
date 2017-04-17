'use strict';
module.exports = function(sequelize, DataTypes) {
    var Accounts = sequelize.define('Accounts', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            validate: { notNull: true, notEmpty: true }
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
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Accounts;
};