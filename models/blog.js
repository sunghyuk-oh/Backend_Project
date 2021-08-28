'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Blog.hasMany(models.Comment, {
                as: 'comments',
                foreignKey: "blog_id"
            })
        }
    };
    Blog.init({
        title: DataTypes.STRING,
        body_text: DataTypes.TEXT,
        region: DataTypes.STRING,
        keyword: DataTypes.STRING,
        image: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Blog',
    });
    return Blog;
};