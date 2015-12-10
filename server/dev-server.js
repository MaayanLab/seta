import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Schema } from './data/schema';
import webpackConfig from '../webpack.config';
import models from './data/models';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// Expose a GraphQL endpoint
const graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log( // eslint-disable-line
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

// Serve the Relay app
const compiler = webpack(webpackConfig);
const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: { '/graphql': `http://localhost:${GRAPHQL_PORT}` },
  publicPath: '/js/',
  quiet: false,
  noInfo: false,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
  },
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, '..', 'src', 'public')));

models.sequelize.sync().then(() => {
  app.listen(APP_PORT);
  console.log(`App is now running on http://localhost:${APP_PORT}`); // eslint-disable-line
});
