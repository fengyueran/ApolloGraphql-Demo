import React, { Component } from 'react';

import { LineContainer } from '@xinghunm/widgets';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { cardsListQuery } from './models/local';
import CardsList from '../../views/cards_list';
import { mockNetworkInterface } from './mock/mocks';

const client = new ApolloClient({
  networkInterface: mockNetworkInterface, 
});

// client
//   .query({
//     query: gql`
//       {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log('adsfasdfa', result));

const CardsListWithData = graphql(cardsListQuery)(CardsList);
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Apollo Graphql</h1>
          </header>
          <LineContainer>
            <CardsListWithData />
          </LineContainer>
        </div>
      </ApolloProvider>
    );
  }
}
