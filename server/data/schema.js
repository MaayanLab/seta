import {
  // GraphQLBoolean,
  // GraphQLID,
  GraphQLInt,
  // GraphQLList,
  // GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  // cursorForObjectInConnection,
  // fromGlobalId,
  globalIdField,
  // mutationWithClientMutationId,
  // nodeDefinitions,
  // toGlobalId,
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

const userType = new GraphQLObjectType({
  name: User.name,
  fields: {
    id: globalIdField(User.name),
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
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
    email: {
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

nodeTypeMapper.mapTypes({
  [User.name]: userType,
  [Group.name]: groupType,
  [Dataset.name]: datasetType,
  [Category.name]: categoryType,
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    user: {
      type: userType,
      args: {
        id: {
          type: GraphQLInt,
        },
        email: {
          type: GraphQLString,
        },
      },
      resolve: resolver(User),
    },
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
      resolve: (root, { id, name }) => findAllCategories({ id, name }),
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
