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
            comment: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.TEXT,
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            timestamps: false,
        }
    );
};

module.exports = Testimony;
