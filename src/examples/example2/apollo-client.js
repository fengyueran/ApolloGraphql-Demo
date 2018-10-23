
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, concat, Observable } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import createClientState from './models/store/client-state';
import errorHandler from './error-handler';

const cache = new InMemoryCache();
const stateLink = createClientState(cache);

const httpLink = new HttpLink({ 
  uri: 'http://localhost:9090/graphql'
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorHandler,
    stateLink,
    httpLink
  ])
});

export default client;