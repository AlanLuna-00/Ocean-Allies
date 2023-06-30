const { DataTypes } = require('sequelize');

const Cart = (sequelize) => {
    sequelize.define(
        'cart',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false, // Opcional, dependiendo de tus requisitos
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports = Cart;
