import { onError } from 'apollo-link-error';

const errorHandler = onError(({ response, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    alert('graphQLErrors');
  } 
  if (networkError) {
    alert('networkError');
  }
});

export default errorHandler;