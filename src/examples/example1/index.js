import React, { Component } from 'react';

import { LineContainer } from '@xinghunm/widgets';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import CardsWithData from './views/cards';


const httpLink = new HttpLink({ 
  uri: 'http://localhost:8080/graphql'
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
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