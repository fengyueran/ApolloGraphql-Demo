import React, { Component } from 'react';

import { VContainer } from '@xinghunm/widgets';
import { ApolloProvider } from 'react-apollo';
import client from './apollo-client';
import CardsWithData from './views/cards';
import TodoPanel from './views/TodoPanel';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Apollo Graphql</h1>
          </header>
          <VContainer>
            <CardsWithData />
            <TodoPanel />
          </VContainer>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
