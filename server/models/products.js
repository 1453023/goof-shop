'use strict';
module.exports = function(sequelize, DataTypes) {
    var products = sequelize.define('products', {
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        price: DataTypes.STRING,
        description: DataTypes.STRING,
        smImgUrl: DataTypes.ARRAY(DataTypes.STRING),
        thumbImgUrl: DataTypes.ARRAY(DataTypes.STRING),
        lgImgUrl: DataTypes.ARRAY(DataTypes.STRING)
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                products.hasMany(models.cart);
            }
        }
    });
    return products;
};