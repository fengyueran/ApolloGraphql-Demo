
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, concat, Observable } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import createClientState from './models/store/client-state';
import errorHandler from './error-handler';

const cache = new InMemoryCache();
const stateLink = createClientState(cache);

const httpLink = new HttpLink({ 
  uri: 'http://localhost:9090/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:9090/graphql',
  options: {
    reconnect: true,
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorHandler,
    stateLink,
    wsLink
  ])
});

export default client;