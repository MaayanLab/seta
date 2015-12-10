export default function (sequelize, DataTypes) {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.User);
        Group.hasMany(models.Datasets);
      },
    },
  });

  return Group;
}
