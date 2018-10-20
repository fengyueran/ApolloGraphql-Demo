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

const dogInfoQuery = gql`
  query DogQuery($breed: String!) {
    dog(breed: $breed) {
      id
      detail
    }
  }
`;

export { dogsListQuery, dogInfoQuery };
