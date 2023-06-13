const { DataTypes } = require('sequelize');

const Testimony = (sequelize) => {
    sequelize.define(
        'testimony',
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
            comment: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports = Testimony;
