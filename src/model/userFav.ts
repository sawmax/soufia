const Sequelize = require("sequelize");

const {sequelize} = require("../database/mysql-connection");

class UserFav extends Sequelize.Model {}

UserFav.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId : {
            type: Sequelize.INTEGER,
            allowNull: false
        } 
    
        ,
        mobile : {
            type: Sequelize.STRING,
            allowNull: false
        }
       
    },
    {
        sequelize,
        modelName: "UserFavorites-Table"
    }
);

export = UserFav;
