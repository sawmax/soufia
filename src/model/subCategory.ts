const Sequelize = require("sequelize");

const {sequelize} = require("../database/mysql-connection");

class SubCategory extends Sequelize.Model {}

SubCategory.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
      
        subCategoryName: {
            type: Sequelize.STRING,
            allowNull: false ,
            unique : true
        }
     
        ,
        categoryId : {
            type: Sequelize.INTEGER,
            allowNull: false

        }
       
    },
    {
        sequelize,
        modelName: "SubCategory-Table"
    }
);

export = SubCategory;
