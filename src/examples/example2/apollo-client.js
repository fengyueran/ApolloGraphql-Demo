
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, concat, Observable } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import createClientState from './models/store/client-state';

const cache = new InMemoryCache();
const stateLink = createClientState(cache);

const httpLink = new HttpLink({ 
  uri: 'http://localhost:9090/graphql'
});

const asyncMiddleware = setContext(request => new Promise((success) => {
  setTimeout(() => {
    success({ token: 'async found token' });
  }, 500);
}));

const client = new ApolloClient({
  cache,
  // link: concat(asyncMiddleware, httpLink),
  link: ApolloLink.from([
    stateLink,
    httpLink
  ])
});

export default client;