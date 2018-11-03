
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, concat, Observable } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';


const asyncMiddleware = setContext(request => new Promise((success) => {
  setTimeout(() => {
    success();
  }, 1000);
}));


const dataIdFromObject = (obj) => {
  if (obj.__typename === 'Channel') { // eslint-disable-line
    return `Channel: ${obj.id}`;
  }
  return defaultDataIdFromObject(obj);
};

const cache = new InMemoryCache({ dataIdFromObject });

const httpLink = new HttpLink({ 
  uri: 'http://localhost:8080/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8080/graphql',
  options: {
    reconnect: true,
  }
});
const { subscriptionClient } = wsLink;

const client = new ApolloClient({
  cache,
  link: concat(asyncMiddleware, wsLink),
  // link: wsLink
});

export default client;