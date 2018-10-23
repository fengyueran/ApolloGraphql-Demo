
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { TOGGLE_TODO } from '../../models/gql/local';


const Todo = ({ id, completed, text }) => (
  <Mutation 
    mutation={TOGGLE_TODO}
    variables={{ id }}
  >
    {
      toggleTodo => (
        <li
          onClick={toggleTodo}
          style={{
            textDecoration: completed ? 'line-through' : 'none',
          }}
        >
          {text}
        </li>
      )
    }
  </Mutation>);

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
}; 

export default Todo;