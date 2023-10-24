module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(360),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        avatar: {
            type: DataTypes.STRING(200),
            allowNull: false
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Listing, {
            foreignKey: 'sellerId',
            as: 'listings'
        });

        User.hasMany(models.Order, {
            foreignKey: 'buyerId',
            as: 'Buyer'
        });
    };

    return User;
};
