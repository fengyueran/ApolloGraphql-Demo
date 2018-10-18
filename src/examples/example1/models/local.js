import gql from 'graphql-tag';

console.log('5555555', gql);

const cardsListQuery = gql`
  query CardsListQuery {
    cards {
      id
      name
    }
  }
`;

export { cardsListQuery }; // eslint-disable-line
