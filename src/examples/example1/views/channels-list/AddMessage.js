import React from 'react';
import { gql, graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { addMessageMutation, channelDetailsQuery } from '../../models/gql/remote';

const MessageInput = styled.div`
  &:before {
    content: "+";
    display: inline-block;
    height: 0px;
    width: 0px;
    /*background-color: #fff;*/
    position: relative;
    top: -1px;
    left: 8px;
    color: rgba(255, 255, 255, 0.6);
  }
`;

// eslint-disable-next-line
const AddMessage = ({ mutate, match }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      mutate({
        variables: {
          message: {
            channelId: match.params.channelId,
            text: evt.target.value
          }
        },
        optimisticResponse: {
          addMessage: {
            text: evt.target.value,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Message',
          },
        },
        update: (store, { data: { addMessage } }) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({
            query: channelDetailsQuery,
            variables: {
              channelId: match.params.channelId,
            }
          });
          // Add our Message from the mutation to the end.
          data.channel.messages.push(addMessage);
          // Write the data back to the cache.
          store.writeQuery({
            query: channelDetailsQuery,
            variables: {
              channelId: match.params.channelId,
            },
            data
          });
        },
      });
      evt.target.value = '';
    }
  };

  return (
    <MessageInput>
      <input
        type="text"
        placeholder="New message"
        onKeyUp={handleKeyUp}
      />
    </MessageInput>
  );
};


const AddMessageWithMutation = graphql(
  addMessageMutation,
)(withRouter(AddMessage));

export default AddMessageWithMutation;
