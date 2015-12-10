export default function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Category.hasMany(models.Dataset);
      },
    },
  });

  return Category;
}
