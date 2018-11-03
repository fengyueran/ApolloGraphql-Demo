import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from "react-router-dom";
import { ApolloProvider } from 'react-apollo';
import ChannelDetails from './views/channels-list/ChannelDetails';
import ChannelsList from './views/channels-list';
import client from './apollo-client';


const Root = styled.div`
  color: #FFFFFF;
  height: 100vh;
  background-image: linear-gradient(175deg, #2b3658 0%, #523e5b 100%);
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


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Root>
          <Hearder>
            React + GraphQL Tutorial
          </Hearder>
          <ChannelsList />
          <Route path="/example1/channel/:channelId" component={ChannelDetails} />
        </Root>
      </ApolloProvider>
    );
  }
}

export default App;