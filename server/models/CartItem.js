const { DataTypes } = require('sequelize');

const CartItem = (sequelize) => {
    sequelize.define(
        'cartItem',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            productId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            cartId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            color: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            sizes: {
                type: DataTypes.JSONB,
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports = CartItem;
