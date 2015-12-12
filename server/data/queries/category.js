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

export function findOneCategory({ id, name }, includeAll = true, attributesArr) {
  // Create whereObj = qArgs without falsey key-value pairs
  const qArgs = arguments[0];
  const whereObj = {};
  for (const key in qArgs) {
    // If key exists and its value is not falsey, add it to whereObj
    if (qArgs.hasOwnProperty(key) && qArgs[key]) {
      whereObj[key] = qArgs[key];
    }
  }
  const query = {};
  // Only add whereObj to query if it has any key-value pairs
  if (Object.keys(whereObj).length > 0) {
    query.where = whereObj;
  }
  // If includeAll is true, include all parts of category i.e. dataset information
  if (isBoolean(includeAll) && includeAll) {
    query.include = [{ all: true }];
  }
  if (attributesArr && attributesArr.length) {
    query.attributes = attributesArr;
  }
  return new Promise((resolve) => {
    Category
      .findOne(query)
      .then((catInstance) => {
        resolve(catInstance.get());
      });
  });
}

export function findAllCategories(includeAll = true, attributesArr, limit) {
  const lim = limit || 30;
  const query = {
    limit: lim,
  };
  // If includeAll is true, include all parts of category i.e. dataset information
  if (isBoolean(includeAll) && includeAll) {
    query.include = [{ all: true }];
  }
  if (attributesArr && attributesArr.length) {
    query.attributes = attributesArr;
  }
  return new Promise((resolve) => {
    Category
      .findAll(query)
      .then((catInstances) => {
        resolve(catInstances.map((instance) => instance.get()));
      });
  });
}
