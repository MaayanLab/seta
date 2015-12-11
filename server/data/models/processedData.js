export default function (sequelize, DataTypes) {
  const ProcessedData = sequelize.define('ProcessedData', {
    uri: DataTypes.STRING,
    filename: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        ProcessedData.belongsTo(models.Group, {
          as: 'group',
          foreignKey: 'groupId',
        });
        ProcessedData.belongsTo(models.Dataset, {
          as: 'dataset',
          foreignKey: 'datasetId',
        });
      },
    },
  });
  return ProcessedData;
}
