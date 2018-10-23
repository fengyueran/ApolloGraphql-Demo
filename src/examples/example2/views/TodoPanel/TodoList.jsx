
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { GET_TODOS } from '../../models/gql/local';
import Todo from './Todo';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      return [];
      // throw new Error(`Unknown filter: ${filter}`);
  }
};

class TodoList extends React.Component {
  render() {
    return (
      <Query query={GET_TODOS}>
        {
          ({ data: { todos, visibilityFilter } }) => (
            <ul>
              {
                getVisibleTodos(todos, visibilityFilter).map(todo => (
                  <Todo key={todo.id} {...todo} />
                ))
              }
            </ul>
          )
        }
      </Query>);
  }
}

export default TodoList;