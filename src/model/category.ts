const Sequelize = require("sequelize");

const {sequelize} = require("../database/mysql-connection");

class Category extends Sequelize.Model {}

Category.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
      
        categoryName: {
            type: Sequelize.STRING,
            allowNull: false
        }
     
    
       
    },
    {
        sequelize,
        modelName: "Category-Table"
    }
);

export = Category;
