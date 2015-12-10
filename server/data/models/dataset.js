export default function (sequelize, DataTypes) {
  const Dataset = sequelize.define('Dataset', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Dataset.hasMany(models.Figure);
        Dataset.belongsTo(models.User, {
          foreignKey: 'creator_id',
          as: 'creator',
        });
      },
    },
  });

  return Dataset;
}
