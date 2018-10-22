import merge from 'lodash/merge';
import { withClientState } from 'apollo-link-state';

import { userState } from './login-state';

const state = [userState];


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