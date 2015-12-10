export default function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Dataset, {
          foreignKey: 'creator_id',
          as: 'Datasets',
        });
        User.hasMany(models.Figure, {
          foreignKey: 'creator_id',
          as: 'Figures',
        });
      },
    },
  });

  return User;
}
