export default function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, unique: true },
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Category.hasMany(models.Dataset, {
          as: 'datasets',
          foreignKey: 'categoryId',
        });
      },
    },
  });

  return Category;
}
