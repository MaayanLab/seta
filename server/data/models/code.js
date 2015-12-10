export default function (sequelize, DataTypes) {
  const Code = sequelize.define('Code', {
    uri: DataTypes.STRING,
    filename: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Code.belongsTo(models.Group);
        Code.belongsTo(models.Dataset);
      },
    },
  });
  return Code;
}
