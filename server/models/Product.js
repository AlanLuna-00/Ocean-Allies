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
                unique: true,
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
                type: DataTypes.ENUM(
                    'T-shirts',
                    'Sweatshirts',
                    'Tank tops',
                    'Leggings',
                    'Dresses'
                ),
                allowNull: false,
            },
            gender: {
                type: DataTypes.ENUM('Man', 'Woman', 'Unisex'),
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            size: {
                type: DataTypes.JSONB,
                allowNull: false,
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports = Product;
