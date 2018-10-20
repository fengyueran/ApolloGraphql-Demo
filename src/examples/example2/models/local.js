import gql from 'graphql-tag';

const dogsListQuery = gql`
  query DogsQuery {
    dogs { 
      id
      breed
      name
      age
    }
  }
`;

export { dogsListQuery };
