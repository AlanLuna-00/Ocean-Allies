const { DataTypes } = require('sequelize');

const Review = (sequelize) => {
    sequelize.define(
        'review',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            rating: {
                type: DataTypes.ENUM('1', '2', '3', '4', '5'),
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

module.exports = Review;
