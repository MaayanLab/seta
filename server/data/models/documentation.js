export default function (sequelize, DataTypes) {
  const Documentation = sequelize.define('Documentation', {
    uri: DataTypes.STRING,
    filename: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Documentation.belongsTo(models.Group, {
          as: 'group',
          foreignKey: 'groupId',
        });
        Documentation.belongsTo(models.Dataset, {
          as: 'dataset',
          foreignKey: 'datasetId',
        });
      },
    },
  });
  return Documentation;
}
