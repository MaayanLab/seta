export default function (sequelize, DataTypes) {
  const Dataset = sequelize.define('Dataset', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Dataset.hasMany(models.Code);
        Dataset.hasMany(models.Figure);
        Dataset.hasMany(models.AnalysisTool);
        Dataset.hasMany(models.Documentation);
        Dataset.hasMany(models.ProcessedData);
        Dataset.belongsTo(models.Group);
        Dataset.belongsTo(models.Category);
      },
    },
  });

  return Dataset;
}
