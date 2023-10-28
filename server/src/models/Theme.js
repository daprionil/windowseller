const { DataTypes } = require("sequelize")

module.exports = function(database){
    database.define('Theme', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        nameTheme:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        basecolor:{
            type: DataTypes.STRING(15),
            allowNull: false
        },
        primarycolor:{
            type: DataTypes.STRING(15),
            allowNull: false
        },
        secondcolor:{
            type: DataTypes.STRING(15),
            allowNull: false
        },
        darkbasecolor:{
            type: DataTypes.STRING(15),
            allowNull: false
        },
        darkprimarycolor:{
            type: DataTypes.STRING(15),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}