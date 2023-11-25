const { DataTypes } = require("sequelize")

module.exports = function(database){
    database.define('Category', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category:{
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}