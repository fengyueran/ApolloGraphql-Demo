import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import cors from 'cors';

import { schema } from '../mock/schema';

const PORT = 8080;
const server = express();

server.use('*', cors({ origin: 'http://localhost:1989' }));
server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`)
});