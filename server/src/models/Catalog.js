const { DataTypes } = require("sequelize")

module.exports = function(database){
    database.define('Catalog', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        catalog:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        }
    })
}