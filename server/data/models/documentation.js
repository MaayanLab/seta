export default function (sequelize, DataTypes) {
  const Documentation = sequelize.define('Documentation', {
    uri: DataTypes.STRING,
    filename: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Documentation.belongsTo(models.Group);
        Documentation.belongsTo(models.Dataset);
      },
    },
  });
  return Documentation;
}
