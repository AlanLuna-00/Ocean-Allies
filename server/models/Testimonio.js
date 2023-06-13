const { DataTypes } = require('sequelize');

const Testimonio = (sequelize) => {
    sequelize.define(
        'testimonio',
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

module.exports = Testimonio;
