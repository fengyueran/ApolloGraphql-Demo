import React from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { channelDetailsQuery } from '../../models/gql/remote';
import ChannelPreview from './ChannelPreview';
import MessageList from './MessageList';

const Text = styled.div`
  width: 200px;
  background-color: transparent;
  padding: 10px 50px 10px 30px;
  outline: none;
  border: none;
  color: #fff;
  font-size: 32px;
  text-align: center;
  color: #22A699;
`;
// eslint-disable-next-line
const ChannelDetails = ({ data: { loading, error, channel }, match }) => {
  if (loading) {
    return <ChannelPreview channelId={match.params.channelId} />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      <Text>
        {channel && channel.name}
      </Text>
      <MessageList messages={channel.messages} />
    </div>);
};

const ChannelDetailsWithQuery = graphql(channelDetailsQuery, {
  options: props => ({
    variables: { channelId: props.match.params.channelId }
  }),
})(ChannelDetails);

export default ChannelDetailsWithQuery;