export default function (sequelize, DataTypes) {
  const Figure = sequelize.define('Figure', {
    uri: DataTypes.STRING,
    filename: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Figure.belongsTo(models.Group);
        Figure.belongsTo(models.Dataset);
      },
    },
  });
  return Figure;
}
