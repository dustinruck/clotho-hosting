module.exports = (sequelize, DataTypes) => {

    const Size = sequelize.define("Size", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    });
    
    Size.associate = (models) => {
        Size.hasMany(models.Listing,
            {   
            foreignKey: 'sizeId'
        });
    };

    return Size;
};