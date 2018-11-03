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
        const messsages = prev.channel.messages;

        if (!prev.channel.messages.find(msg => msg.id === newMessage.id)) {
          return { channel: { ...prev.channel, messages: messsages.concat([newMessage]) } };
        }
        return prev;
      }
    });
  }

  render() {
    const { data: { loading, error, channel }, match } = this.props;
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
  }
}

ChannelDetails.propTypes = {
  data: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const ChannelDetailsWithQuery = graphql(channelDetailsQuery, {
  options: props => ({
    variables: { channelId: props.match.params.channelId }
  }),
})(ChannelDetails);

export default ChannelDetailsWithQuery;