const Sequelize = require("sequelize");

const {sequelize} = require("../database/mysql-connection");

class Colors extends Sequelize.Model {}

Colors.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
      
        name: {
            type: Sequelize.STRING,
            allowNull: false
        } , 
        colorCode: {
            type: Sequelize.STRING,
            allowNull: true
        }
     
    
       
    },
    {
        sequelize,
        modelName: "Colors-Table"
    }
);

export = Colors;
