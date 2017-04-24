'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            smImgUrl: {
                type: Sequelize.ARRAY(Sequelize.STRING)
            },
            thumbImgUrl: {
                type: Sequelize.ARRAY(Sequelize.STRING)
            },
            lgImgUrl: {
                type: Sequelize.ARRAY(Sequelize.STRING)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('products');
    }
};