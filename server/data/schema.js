import {
  GraphQLInt,
  // GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  globalIdField,
} from 'graphql-relay';

import { relay, resolver } from 'graphql-sequelize';
import db from './models';
import { findDatasetsByCategory } from './queries/dataset';
import { findAllCategories } from './queries/category';

const {
  User,
  Group,
  Dataset,
  Category,
} = db;

const { sequelizeNodeInterface } = relay;
const {
  nodeInterface,
  nodeField,
  nodeTypeMapper,
} = sequelizeNodeInterface(db.sequelize);

const datasetType = new GraphQLObjectType({
  name: Dataset.name,
  fields: {
    id: globalIdField(Dataset.name),
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
  },
  interfaces: [nodeInterface],
});

const { connectionType: datasetConnection } =
  connectionDefinitions({ name: Dataset.name, nodeType: datasetType });

const categoryType = new GraphQLObjectType({
  name: Category.name,
  fields: {
    id: globalIdField(Category.name),
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    datasets: {
      type: datasetConnection,
      description: 'The datasets within a given category',
      args: connectionArgs,
      resolve: (category, args) => {
        return connectionFromPromisedArray(
          findDatasetsByCategory(category.id),
          args
        );
      },
    },
  },
  interfaces: [nodeInterface],
});

const { connectionType: categoryConnection } =
  connectionDefinitions({ name: Category.name, nodeType: categoryType });

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    id: globalIdField('Viewer'),
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    categories: {
      type: categoryConnection,
      args: connectionArgs,
      resolve: (category, args) => {
        return connectionFromPromisedArray(
          findAllCategories(),
          args
        );
      },
    },
  },
  interfaces: [nodeInterface],
});

const groupType = new GraphQLObjectType({
  name: Group.name,
  fields: {
    id: globalIdField(Group.name),
    name: {
      type: GraphQLString,
    },
  },
  interfaces: [nodeInterface],
});

nodeTypeMapper.mapTypes({
  [Dataset.name]: datasetType,
  [Category.name]: categoryType,
  'Viewer': viewerType,
  [Group.name]: groupType,
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    group: {
      type: groupType,
      args: {
        id: {
          type: GraphQLInt,
        },
        name: {
          type: GraphQLString,
        },
      },
      resolve: resolver(Group),
    },
    category: {
      type: categoryType,
      args: {
        id: {
          type: GraphQLInt,
        },
        name: {
          type: GraphQLString,
        },
      },
      resolve: resolver(Category),
    },
    viewer: {
      type: viewerType,
      args: {
        id: {
          type: GraphQLInt,
        },
        email: {
          type: GraphQLString,
        },
      },
      resolve: () => resolver(User),
    },
    dataset: {
      type: datasetType,
      args: {
        id: {
          type: GraphQLInt,
        },
        title: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
      },
      resolve: resolver(Dataset),
    },
  }),
});

export const Schema = new GraphQLSchema({
  query: queryType,
});
