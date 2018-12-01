

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { LineContainer, VContainer, FlexContainer } from '@xinghunm/widgets';
import { 
  serverAddressQuery, channelsListQuery, addChannelMutation, deleteChannelMutation
} from '../../models/gql/remote';
import ChannelDetails from './ChannelDetails';
import SelectedChannel from './SelectedChannel';


const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

const Li = styled.li`
  padding: 10px 20px;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 400;
  width: 20%;
  text-align: left;
  a {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const ChannelsContainer = styled.div`
  padding: 0 30px;
  position: relative;
  input {
    width: 200px;
    background-color: transparent;
    padding: 10px 20px 10px 30px;
    outline: none;
    border: none;
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: 300ms all ease-out;
    &:focus {
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      transition: 300ms all ease-out;
    }
  }
  &:before {
    content: "+";
    display: inline-block;
    height: 10px;
    width: 10px;
    /*background-color: #fff;*/
    position: absolute;
    top: 7.5px;
    left: 40px;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Button = styled.div`
  outline: none;
  margin: 5px;
  position: absolute;
  left: 22%;
  width: 30px;
  height: 30px;
  color: red;
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

// const DetailButton = styled.button`
//   outline: none;
//   margin: 5px;
//   position: absolute;
//   right: 0;
//   width: 60px;
//   height: 30px;
// `;

const AddChannel = ({ addChannel1, addChannel2 }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      addChannel1(evt.target.value).then(() => {
        evt.target.value = ''; 
      });
    }
  };

  return (
    <input
      type="text"
      placeholder="New channel"
      onKeyUp={handleKeyUp}
    />
  );
};


AddChannel.propTypes = {
  addChannel1: PropTypes.func.isRequired,
  addChannel2: PropTypes.func.isRequired
};

// 多个mutation
const AddChannelWithMutations = compose(
  graphql(addChannelMutation, { 
    props: ({ mutate }) => ({
      addChannel1: name => mutate({
        variables: { 
          name,
        },
        optimisticResponse: { // update前更新
          addChannel: {
            name,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Channel'
          }
        },
        update: (cache, { data: { addChannel }, loading, error }) => { // addChannel为该mutation返回的数据
          // Read the data from the cache for this query.
          const { channels } = cache.readQuery({ query: channelsListQuery });
          // Write the data back to the cache.
          cache.writeQuery({ 
            query: channelsListQuery,
            data: { channels: channels.concat([addChannel]) } // 不能修改源数据，否则无法更新
          });
        },
        // refetchQueries: [{ query: channelsListQuery }], // mutation完成后重新获取以刷新ui
      })
    }),
  }),
  graphql(addChannelMutation, {
    props: ({ mutate }) => ({
      addChannel2: () => mutate()
    }),
  }),
)(AddChannel);

const DeleteChannel = ({ id, deleteChannel }) => (
  <Button 
    onClick={() => {
      deleteChannel(id);
    }}
  >
    ×
  </Button>
);
DeleteChannel.propTypes = {
  id: PropTypes.string.isRequired,
  deleteChannel: PropTypes.func.isRequired
};

const DeleteChannelWithMutation = graphql(
  deleteChannelMutation, {
    props: ({ mutate }) => ({ 
      deleteChannel: id => mutate({
        variables: { 
          id
        },
        // deleteChannel为该mutation返回的数据
        update: (cache, { data: { deleteChannel, loading, error } }) => { 
          if (error) {
            console.log('add card fail');
          } else if (deleteChannel) {
            console.log('add card success');
          }
        },
        refetchQueries: [{ query: channelsListQuery }], 
      })
    }),
  }
)(DeleteChannel);

class ChannelsList extends React.Component {
  state = {
    selectedChannelId: null
  }

  handleSelectChannel = (id) => {
    this.setState({ selectedChannelId: id });
  }

  render() {
    const { channelsListData, serverAddressData } = this.props;
    if (channelsListData.loading || serverAddressData.loading) {
      return <p>Loading ...</p>;
    }
    if (channelsListData.error || serverAddressData.error) {
      return <p>{channelsListData.error.message}</p>;
    }

    console.log('serverAddress:', serverAddressData.serverAddress);
    const { selectedChannelId } = this.state;
    const optimisticStyle = { color: 'rgba(255, 255, 255, 0.5)' };
    return (
      <ChannelsContainer>
        <AddChannelWithMutations />
        <Ul>
          { 
            channelsListData.channels.map(ch => (
              <LineContainer key={ch.id}>
                <Li 
                  onClick={() => this.handleSelectChannel(ch.id)}
                  style={ch.id < 0 ? optimisticStyle : null}
                >
                  <Link to={ch.id < 0 ? `/example1` : `/example1/channel/${ch.id}`}>
                    {ch.name}
                  </Link>
                </Li>
                <DeleteChannelWithMutation id={ch.id} />
              </LineContainer>
            ))
          }
          {
            selectedChannelId && <SelectedChannel channelId={selectedChannelId} />
          }
        </Ul>
      </ChannelsContainer>);
  }
}

ChannelsList.propTypes = {
  channelsListData: PropTypes.object.isRequired, 
  serverAddressData: PropTypes.object.isRequired,
};

// const ChannelsListWithData = graphql(channelsListQuery, {
//   // options: { pollInterval: 500 } // 5s拉取一次数据
// })(ChannelsList);

const ChannelsListWithData = compose(
  graphql(channelsListQuery, {
    name: "channelsListData"
    // options: { pollInterval: 500 } // 5s拉取一次数据
  }),
  graphql(serverAddressQuery, {
    name: "serverAddressData"
  }),
)(ChannelsList);

export default ChannelsListWithData;