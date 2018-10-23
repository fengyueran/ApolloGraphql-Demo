
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import { ADD_TODO } from '../../models/gql/local';


const TodoForm = ({ id, completed, text }) => (
  <Mutation 
    mutation={ADD_TODO}
  >
    {
      (addTodo) => {
        let input;
        return (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!input.value.trim()) {
                  return;
                }
                addTodo({ variables: { text: input.value } });
                input.value = '';
              }}
            >
              <input
                ref={(node) => { input = node; }}
              />
              <button type="submit">Add Todo</button>
            </form>
          </div>
        );
      }
    }
  </Mutation>);

TodoForm.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
}; 

export default TodoForm;