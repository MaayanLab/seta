export default function (sequelize, DataTypes) {
  const ProcessedData = sequelize.define('ProcessedData', {
    uri: DataTypes.STRING,
    filename: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        ProcessedData.belongsTo(models.Group);
        ProcessedData.belongsTo(models.Dataset);
      },
    },
  });
  return ProcessedData;
}
