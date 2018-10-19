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

const addCardMutation = gql`
  mutation addCard($i: CreateCardInput!) {
    addCard(i: $i) {
      caseName
      name
      sex
    }
  }
`;

export { cardsListQuery, addCardMutation };
