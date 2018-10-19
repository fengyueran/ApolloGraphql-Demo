import gql from 'graphql-tag';

const cardsListQuery = gql`
  query CardsListQuery {
    cards {
      id
      name
      sex
    }
  }
`;

export { cardsListQuery };
