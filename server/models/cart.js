'use strict';
module.exports = function(sequelize, DataTypes) {
    var cart = sequelize.define('cart', {
        amount: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                cart.belongsTo(models.products, { foreignkey: 'product_id' })
            }
        }
    });
    return cart;
};