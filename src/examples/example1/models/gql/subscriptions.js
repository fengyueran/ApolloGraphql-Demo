import gql from 'graphql-tag';

export const cardsSubscription = gql`
  subscription cardAdded($cardId: ID!) {
    cardAdded(cardId: $cardId) {
      id
      name
    }
  }
`;