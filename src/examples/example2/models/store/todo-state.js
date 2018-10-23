import { GET_TODOS, IS_TODO_COMPLETED } from '../gql/local';

const todoDefaults = {
  todos: [],
  visibilityFilter: 'SHOW_ALL'
};

let nextTodoId = 0;

const todoState = {
  defaults: todoDefaults,
  Mutation: {
    addTodo: (root, { text }, { cache }, info) => {
      const previous = cache.readQuery({ query: GET_TODOS });
      const newTodo = {
        id: nextTodoId++,
        text,
        completed: false,
        __typename: 'TodoItem'
      };

      const data = {
        todos: previous.todos.concat([newTodo])
      };
      cache.writeData({ data });
      return newTodo;
    },
    toggleTodo: (root, variables, { cache, getCacheKey }, info) => {
      const id = getCacheKey({ __typename: 'TodoItem', id: variables.id });// `${__typename}:${id}`
      const todo = cache.readFragment({ fragment: IS_TODO_COMPLETED, id });

      const data = { ...todo, completed: !todo.completed };
      cache.writeData({ id, data });
      return null;
    }
  }
};

export { todoState };