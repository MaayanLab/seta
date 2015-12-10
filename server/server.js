import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import { Schema } from './data/schema';

const APP_PORT = 3000;

// Expose a GraphQL endpoint
const app = express();
app.use('/graphql', graphQLHTTP({
  graphiql: false,
  pretty: true,
  schema: Schema,
}));

// Serve static resources
app.use('/', express.static(path.resolve(__dirname, '..', 'src', 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`); // eslint-disable-line
});
