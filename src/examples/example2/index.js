/*eslint-disable*/
import React, { Component } from 'react';

import { LineContainer } from '@xinghunm/widgets';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, concat, Observable } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import CardsWithData from './views/cards';

const asyncMiddleware = setContext(request => new Promise((success) => {
  setTimeout(() => {
    success({ token: 'async found token' });
  }, 500);
}));

const httpLink = new HttpLink({ 
  uri: 'http://localhost:9090/graphql'
});
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   // link: concat(asyncMiddleware, httpLink),
//   link: httpLink
// });

const client = new ApolloClient({
  uri: "http://localhost:9090/graphql"
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Apollo Graphql</h1>
          </header>
          <LineContainer>
            <CardsWithData />
          </LineContainer>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;





