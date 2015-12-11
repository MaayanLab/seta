export default function (sequelize, DataTypes) {
  const Group = sequelize.define('Group', {
    name: { type: DataTypes.STRING, unique: true },
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.User, {
          as: 'users',
          foreignKey: 'groupId',
        });
        Group.hasMany(models.Script, {
          as: 'scripts',
          foreignKey: 'groupId',
        });
        Group.hasMany(models.Figure, {
          as: 'figures',
          foreignKey: 'groupId',
        });
        Group.hasMany(models.Dataset, {
          as: 'datasets',
          foreignKey: 'groupId',
        });
        Group.hasMany(models.AnalysisTool, {
          as: 'analysisTools',
          foreignKey: 'groupId',
        });
        Group.hasMany(models.ProcessedData, {
          as: 'processedData',
          foreignKey: 'groupId',
        });
        Group.hasMany(models.Documentation, {
          as: 'docs',
          foreignKey: 'groupId',
        });
      },
    },
  });

  return Group;
}
