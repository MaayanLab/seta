export default function (sequelize, DataTypes) {
  const Figure = sequelize.define('Figure', {
    uri: DataTypes.STRING,
    filename: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Figure.belongsTo(models.Group, {
          as: 'group',
          foreignKey: 'groupId',
        });
        Figure.belongsTo(models.Dataset, {
          as: 'dataset',
          foreignKey: 'datasetId',
        });
      },
    },
  });
  return Figure;
}
