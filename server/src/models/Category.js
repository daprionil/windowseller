const { DataTypes } = require("sequelize")

module.exports = function(database){
    database.define('Category', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        category:{
            type: DataTypes.STRING(45),
            allowNull: false
        }
    })
}