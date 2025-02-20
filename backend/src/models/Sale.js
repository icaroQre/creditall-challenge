const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Client = require('./Client');

const Sale = sequelize.define('Sale', {

quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
discount: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
},
status: {
    type: DataTypes.ENUM('completed', 'pending', 'canceled'),
    allowNull: false,
},
saleDate: {
    type: DataTypes.DATE,
    allowNull: false,
}
}, {
    tableName: 'sales',
    timestamps: true,
});

Sale.belongsTo(Client, {
    foreignKey: 'clientId',
    onDelete: 'CASCADE',
});

Sale.belongsTo(Product, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
});

module.exports = Sale;