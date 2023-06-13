const { DataTypes } = require('sequelize');

const Product = (sequelize) => {
    sequelize.define(
        'product',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            size: {
                type: DataTypes.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL'),
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports = Product;
