import gql from 'graphql-tag';

const GET_TODOS = gql`
  query TodosQuery {
    todos @client { 
      id
      completed
      text
    }
    visibilityFilter @client
  }
`;

const GET_VISIBILITY_FILTER = gql`
  query VisibilityFilterQuery {
    visibilityFilter @client 
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client 
  }
`;

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) @client {
      id
    }
  }
`;

const IS_TODO_COMPLETED = gql`
  fragment completeTodo on TodoItem {
    completed
  }
`;

export { 
  GET_TODOS, TOGGLE_TODO, ADD_TODO, GET_VISIBILITY_FILTER, IS_TODO_COMPLETED
};