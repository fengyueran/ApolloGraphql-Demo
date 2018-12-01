import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, withApollo } from 'react-apollo';
import { channelQuery } from '../../models/gql/remote';

class SelectedChannel extends React.Component {
  get channelName() {
    const { data } = this.props; 
    const { channel, error, loading } = data;
    console.log('data', data);
    // channelId改变时loading会变为true
    if (loading || error) return null;
    return channel && channel.name;
  }

  render() {
    return <span>{this.channelName}</span>;
  }
}

SelectedChannel.propTypes = {
  data: PropTypes.object.isRequired
};

const SelectedChannelWithData = graphql(channelQuery, {
  options: props => ({
    // fetchPolicy: 'network-only',
    variables: { channelId: props.channelId },
  }),
})(SelectedChannel);

export default SelectedChannelWithData;
