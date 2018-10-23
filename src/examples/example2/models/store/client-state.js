import merge from 'lodash/merge';
import { withClientState } from 'apollo-link-state';

import { userState } from './login-state';
import { todoState } from './todo-state';

const state = [userState, todoState];


const createClientState = (cache) => {
  const { defaults, Mutation, Query } = merge(...state);
  return withClientState({
    cache,
    defaults,
    resolvers: {
      Query,
      Mutation,
    }
  });
};

export default createClientState;