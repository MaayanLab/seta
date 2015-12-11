import sequelize from '../models';
const { Category } = sequelize;
import isBoolean from 'lodash/lang/isBoolean';

export function getCategoryById(id) {
  return new Promise((resolve) => {
    Category
      .findOne({ id, include: [{ all: true }] })
      .then((category) => {
        resolve(category);
      });
  });
}

export function findOneCategory(queryObj, includeAll, attributesArr) {
  const query = {
    where: queryObj,
  };
  if (isBoolean(includeAll) && includeAll) {
    query.include = [{ all: true }];
  }
  if (attributesArr && attributesArr.length) {
    query.attributes = attributesArr;
  }
  return new Promise((resolve) => {
    Category
      .findOne(query)
      .then((category) => {
        resolve(category);
      });
  });
}

export function findAllCategories({ id, name }, includeAll, attributesArr, limit) {
  // Remove falsey values from whereObj. id or name might not exist
  const whereObj = arguments[0];
  for (const key in whereObj) {
    if (whereObj.hasOwnProperty(key) && !whereObj[key]) {
      delete whereObj[key];
    }
  }
  const lim = limit || 10;
  const query = {
    where: whereObj,
    limit: lim,
  };
  if (isBoolean(includeAll) && includeAll) {
    query.include = [{ all: true }];
  }
  if (attributesArr && attributesArr.length) {
    query.attributes = attributesArr;
  }
  return new Promise((resolve) => {
    Category
      .find(query)
      .then((category) => {
        resolve(category);
      });
  });
}
