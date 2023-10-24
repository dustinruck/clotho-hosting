module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        listingId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });


    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order,
            {
                foreignKey: 'orderId'
            });
        OrderItem.belongsTo(models.Listing,
            {
                foreignKey: 'listingId'
            });
    };


    return OrderItem;
};
