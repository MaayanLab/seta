export default function (sequelize, DataTypes) {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.User);
        Group.hasMany(models.Code);
        Group.hasMany(models.Figure);
        Group.hasMany(models.Dataset);
        Group.hasMany(models.AnalysisTool);
        Group.hasMany(models.ProcessedData);
        Group.hasMany(models.Documentation);
      },
    },
  });

  return Group;
}
