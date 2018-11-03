import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AddMessage from './AddMessage';


const MessageContainer = styled.div`
  padding: 0 30px;
  position: fixed;
  max-height: 400px;
  overflow: auto;
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
    &:focus {
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      transition: 300ms all ease-out;
    }
  }
`;

const Message = styled.div`
  position: relative;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  text-align: left;
  padding-left: 30px;
  font-size: 16px;
`;
const MessageList = ({ messages }) => {
  const optimisticStyle = { color: 'rgba(255, 255, 255, 0.5)' };
  return (
    <MessageContainer>
      { messages.map(message => (
        <Message key={message.id} style={message.id < 0 ? optimisticStyle : null}>
          {message.text}
        </Message>))
      }
      <AddMessage />
    </MessageContainer>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
};

export default (MessageList);
