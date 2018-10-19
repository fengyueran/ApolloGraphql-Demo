import React, { Component } from 'react';

import { LineContainer } from '@xinghunm/widgets';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-link-http';
import { cardsListQuery } from './models/local';
import CardsList from '../../views/cards_list';


const httpLink = new HttpLink({ 
  uri: 'http://localhost:8080/graphql'
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
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

export default App;