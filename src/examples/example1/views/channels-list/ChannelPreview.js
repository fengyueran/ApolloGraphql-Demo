import React from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import { channelQuery } from '../../models/gql/remote';

// eslint-disable-next-line
const ChannelPreview = ({ data: { loading, error, channel } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <div className="channelName">
        {channel && channel.name}
      </div>
      <div>Loading Messages</div>
    </div>);
};


const ChannelPreviewWithQuery = graphql(channelQuery, {
  options: props => ({
    variables: { channelId: props.channelId },
  }),
})(ChannelPreview);

export default ChannelPreviewWithQuery;
