const { DataTypes } = require('sequelize');

const purchaseModel = (sequelize) => {
    sequelize.define(
        'purchase',
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
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports = purchaseModel;
