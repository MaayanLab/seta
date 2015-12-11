export default function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
  }, {
    classMethods: {
      associate: (models) => {
        User.Group = User.belongsTo(models.Group, {
          as: 'group',
          foreignKey: 'groupId',
        });
      },
    },
  });
  return User;
}
