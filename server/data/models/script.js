export default function (sequelize, DataTypes) {
  const Script = sequelize.define('Script', {
    uri: DataTypes.STRING,
    filename: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Script.belongsTo(models.Group, {
          as: 'group',
          foreignKey: 'groupId',
        });
        Script.belongsTo(models.Dataset, {
          as: 'dataset',
          foreignKey: 'datasetId',
        });
      },
    },
  });
  return Script;
}
