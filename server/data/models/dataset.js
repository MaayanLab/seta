export default function (sequelize, DataTypes) {
  const Dataset = sequelize.define('Dataset', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Dataset.hasMany(models.Script, {
          as: 'scripts',
          foreignKey: 'datasetId',
        });
        Dataset.hasMany(models.Figure, {
          as: 'figures',
          foreignKey: 'datasetId',
        });
        Dataset.hasMany(models.AnalysisTool, {
          as: 'analysisTools',
          foreignKey: 'datasetId',
        });
        Dataset.hasMany(models.Documentation, {
          as: 'docs',
          foreignKey: 'datasetId',
        });
        Dataset.hasMany(models.ProcessedData, {
          as: 'processedData',
          foreignKey: 'datasetId',
        });
        Dataset.Group = Dataset.belongsTo(models.Group, {
          as: 'group',
          foreignKey: 'groupId',
        });
        Dataset.Category = Dataset.belongsTo(models.Category, {
          as: 'category',
          foreignKey: 'categoryId',
        });
      },
    },
  });

  return Dataset;
}
