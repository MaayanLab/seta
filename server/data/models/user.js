export default function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsTo(models.Group);
      },
    },
  });
  return User;
}
