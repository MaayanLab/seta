export default function (sequelize, DataTypes) {
  const AnalysisTool = sequelize.define('AnalysisTool', {
    uri: DataTypes.STRING,
    filename: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        AnalysisTool.belongsTo(models.Group);
        AnalysisTool.belongsTo(models.Dataset);
      },
    },
  });
  return AnalysisTool;
}
