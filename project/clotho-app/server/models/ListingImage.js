module.exports = (sequelize, DataTypes) => {
    const ListingImage = sequelize.define("ListingImage", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        listingId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    })

    ListingImage.associate = (models) => {

        ListingImage.belongsTo(models.Listing,
            {
                foreignKey: 'listingId'
            });

    };

    return ListingImage;
};