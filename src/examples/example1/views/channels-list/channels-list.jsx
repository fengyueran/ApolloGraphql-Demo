

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { LineContainer, VContainer, FlexContainer } from '@xinghunm/widgets';
import { channelsListQuery, addChannelMutation, deleteChannelMutation } from '../../models/gql/remote';
import CardDetail from './card-detail';


const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

const Li = styled.li`
  padding: 10px 20px;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  width: 20%;
  text-align: left;
`;

const ChannelsContainer = styled.div`
  padding: 0 30px;
  position: relative;
  height: 100vh;
  background-image: linear-gradient(175deg, #2b3658 0%, #523e5b 100%);
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
        // optimisticResponse: {
        //   addCard: {
        //     name: 'test',
        //     id: 'tmp',
        //     __typename: 'Card'
        //   }
        // },
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
  // graphql(addChannelMutation, {
  //   props: ({ mutate }) => ({
  //     addChannel2: () => mutate()
  //   }),
  // }),
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


const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <ChannelsContainer>
      <AddChannelWithMutations />
      <Ul>
        { 
          channels.map(ch => (
            <LineContainer>
              <Li key={ch.id}>{ch.name}</Li>
              <DeleteChannelWithMutation id={ch.id} />
            </LineContainer>
          ))
        }
      </Ul>
    </ChannelsContainer>);
};

ChannelsList.propTypes = {
  data: PropTypes.object.isRequired,
};

const ChannelsListWithData = graphql(channelsListQuery, {
  // options: { pollInterval: 500 } // 5s拉取一次数据
})(ChannelsList);

export default ChannelsListWithData;