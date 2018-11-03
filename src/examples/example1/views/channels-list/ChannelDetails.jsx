import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { channelDetailsQuery } from '../../models/gql/remote';
import ChannelPreview from './ChannelPreview';
import MessageList from './MessageList';
import { messagesSubscription } from '../../models/gql/subscriptions';


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

const Button = styled.button`
  margin-left: 29px;
  margin-bottom: 10px;
  height: 30px;
  border-radius: 3px;
  outline: none;
`;


class ChannelDetails extends React.Component {
  componentWillMount() {
    const { data, match } = this.props;
    data.subscribeToMore({
      document: messagesSubscription,
      variables: {
        channelId: match.params.channelId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newMessage = subscriptionData.data.messageAdded;
        const messsages = prev.channel.messageFeed.messages;

        if (!prev.channel.messageFeed.messages.find(msg => msg.id === newMessage.id)) {
          return { 
            channel: { 
              ...prev.channel,
              messageFeed: { 
                messages: messsages.concat([newMessage]),
                __typename: 'MessageFeed'
              }
            }
          };
        }
        return prev;
      }
    });
  }

  render() {
    const { data: { loading, error, channel }, match, loadOlderMessages } = this.props;
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
        <Button onClick={loadOlderMessages}>
          Load Older Messages
        </Button>
        <MessageList messages={channel.messageFeed.messages} />
      </div>);
  }
}

ChannelDetails.propTypes = {
  data: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  loadOlderMessages: PropTypes.func.isRequired
};

const ChannelDetailsWithQuery = graphql(channelDetailsQuery, {
  options: props => ({
    variables: { channelId: props.match.params.channelId }
  }),
  props: props => ({
    data: props.data,
    loadOlderMessages: () => {
      const { data } = props;
      data.fetchMore({
        variables: {
          channelId: props.data.channel.id,
          cursor: props.data.channel.messageFeed.cursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const prevMessageFeed = previousResult.channel.messageFeed;
          const newMessageFeed = fetchMoreResult.channel.messageFeed;
          const newChannelData = { 
            ...previousResult.channel,
            messageFeed: {
              messages: [
                ...newMessageFeed.messages,
                ...prevMessageFeed.messages
              ],
              cursor: newMessageFeed.cursor,
              __typename: 'MessageFeed'
            }
          };
          const newData = {
            ...previousResult,
            channel: newChannelData,
          };
          return newData;
        }
      });
    }
  })
})(ChannelDetails);

export default ChannelDetailsWithQuery;