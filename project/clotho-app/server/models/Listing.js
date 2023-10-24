module.exports = (sequelize, DataTypes) => {
    const Listing = sequelize.define("Listing", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sizeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        isSold: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    })

    Listing.associate = (models) => {

        Listing.belongsTo(models.User,
            {
                foreignKey: 'sellerId',
                as: 'Seller'
            });

        Listing.belongsTo(models.Category,
            {
                foreignKey: 'categoryId'
            });

        Listing.belongsTo(models.Gender,
            {
                foreignKey: 'genderId'
            });

        Listing.belongsTo(models.Size,
            {
                foreignKey: 'sizeId'
            });

        Listing.hasOne(models.OrderItem,
            {
                foreignKey: 'listingId'
            });

        Listing.hasMany(models.ListingImage,
            {
                foreignKey: 'listingId'
            });
    };

    return Listing;
};