import sequelize from '../models';
const { Dataset } = sequelize;
import isBoolean from 'lodash/lang/isBoolean';
import isArray from 'lodash/lang/isArray';

export function getDatasetById(id, includeAll) {
  const query = { id };
  // Only don't include everything if false is specifically passed to function
  if (isBoolean(includeAll) && !includeAll) {
    query.include = [];
  } else {
    query.include = [{ all: true }];
  }
  return new Promise((resolve) => {
    Dataset
      .findOne(query)
      .then((dataset) => {
        resolve(dataset);
      });
  });
}

export function findOneDataset(queryObj, includeAll, attributesArr) {
  const query = {
    where: queryObj,
  };
  // Only don't include everything if false is specifically passed to function
  if (isBoolean(includeAll) && !includeAll) {
    query.include = [];
  } else {
    query.include = [{ all: true }];
  }
  if (attributesArr && attributesArr.length) {
    query.attributes = attributesArr;
  }
  return new Promise((resolve) => {
    Dataset
      .findOne(query)
      .then((dataset) => {
        resolve(dataset);
      });
  });
}

export function findAllDatasets(queryObj, includeAll, attributesArr, limit) {
  const lim = limit || 10;
  const query = {
    where: queryObj,
    limit: lim,
  };
  // Only don't include everything if false is specifically passed to function
  if (isBoolean(includeAll) && !includeAll) {
    query.include = [];
  } else {
    query.include = [{ all: true }];
  }
  if (attributesArr && attributesArr.length) {
    query.attributes = attributesArr;
  }
  return new Promise((resolve) => {
    Dataset
      .find(query)
      .then((dataset) => {
        resolve(dataset);
      });
  });
}

export function findDatasetsByCategory(categoryId, includeAll, attributesArr) {
  const query = {
    where: { categoryId },
  };
  // Only don't include everything if false is specifically passed to function
  if (isBoolean(includeAll) && !includeAll) {
    query.include = [];
  } else {
    query.include = [{ all: true }];
  }
  if (attributesArr && attributesArr.length) {
    query.attributes = attributesArr;
  }
  return new Promise((resolve) => {
    Dataset
      .find(query)
      .then((datasets) => {
        if (!isArray(datasets)) {
          resolve([datasets]);
        } else {
          resolve(datasets);
        }
      });
  });
}
