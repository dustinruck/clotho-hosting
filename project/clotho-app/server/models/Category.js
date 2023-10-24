module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("Category", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    });
    
    // Category.associate = (models) => {
    //     Category.hasMany(models.Listing);
    // };

    Category.associate = (models) => {
        Category.hasMany(models.Listing,
            {    
                foreignKey: 'categoryId'
            });
    };

    return Category;
};