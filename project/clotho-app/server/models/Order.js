module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        buyerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        paymentDetails: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        isCancelled: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    });

    Order.associate = (models) => {
        Order.hasMany(models.OrderItem,
            {
                foreignKey: 'orderId'
            });

        Order.belongsTo(models.User,
            {
                foreignKey: 'buyerId',
                as: 'Buyer'
            });
    };


    return Order;
};
