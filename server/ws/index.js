import express from 'express';
import bodyParser from 'body-parser';
import { execute, subscribe } from 'graphql';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import { schema } from './schema';


const PORT = 8080;
const app = express();
const ws = createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));

ws.listen(PORT, () => {
  SubscriptionServer.create({
    execute,
    subscribe,
    schema,
    onConnect: () => { console.log('websoket connected'); }
  }, {
    server: ws,
    path: '/graphql' 
  });
  console.log(`GraphQL ws is now running on http://localhost:${PORT}`);
});