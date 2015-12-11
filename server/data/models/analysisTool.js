export default function (sequelize, DataTypes) {
  const AnalysisTool = sequelize.define('AnalysisTool', {
    uri: DataTypes.STRING,
    filename: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        AnalysisTool.belongsTo(models.Group, {
          as: 'group',
          foreignKey: 'groupId',
        });
        AnalysisTool.belongsTo(models.Dataset, {
          as: 'dataset',
          foreignKey: 'datasetId',
        });
      },
    },
  });
  return AnalysisTool;
}
