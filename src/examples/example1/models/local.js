import gql from 'graphql-tag';

const cardsListQuery = gql`
  query CardsListQuery {
    cards {
      id
      caseName
      name
      sex
    }
  }
`;

export { cardsListQuery };
