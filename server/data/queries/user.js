import sequelize from '../models';
const { User } = sequelize;

exports.getUserById = (id) => {
  return new Promise((resolve) => {
    User
      .findOne({ id, include: [{ all: true }] })
      .then((user) => {
        resolve(user);
      });
  });
};
