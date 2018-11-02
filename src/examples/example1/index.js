import React, { Component } from 'react';
import styled from 'styled-components';
import { LineContainer } from '@xinghunm/widgets';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, concat, Observable } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import ChannelsList from './views/channels-list';


const Root = styled.div`
  color: #FFFFFF;
`;

const Hearder = styled.div`
  background-color: #333;
  color: #fff;
  padding: 10px 30px;
  text-align: left;
  font-weight: 200;
  font-size: 20px;
  line-height: 30px;
  display: flex;
  align-items: center;
`;

const asyncMiddleware = setContext(request => new Promise((success) => {
  setTimeout(() => {
    success();
  }, 1000);
}));

const httpLink = new HttpLink({ 
  uri: 'http://localhost:8080/graphql'
});
const client = new ApolloClient({
  link: concat(asyncMiddleware, httpLink),
  // link: httpLink,
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Root>
          <Hearder>
            React + GraphQL Tutorial
          </Hearder>
          <ChannelsList />
        </Root>
      </ApolloProvider>
    );
  }
}

export default App;