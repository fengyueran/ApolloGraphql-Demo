import React, { Component } from 'react';

import { LineContainer } from '@xinghunm/widgets';
import { ApolloProvider } from 'react-apollo';
import client from './apollo-client';
import CardsWithData from './views/cards';

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
