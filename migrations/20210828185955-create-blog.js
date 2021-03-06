'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Blogs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            body_text: {
                type: Sequelize.TEXT
            },
            region: {
                type: Sequelize.STRING
            },
            keyword: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: "Users", field: "id" }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                get() {
                    return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY');
                }
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Blogs');
    }
};