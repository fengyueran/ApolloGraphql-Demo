import gql from 'graphql-tag';

const cardsListQuery = gql`
  query CardsListQuery {
    cards { # 返回cards数组，数组每个元素包含id，caseName, name和sex
      id
      caseName
      name
      age
    }
  }
`;

const cardQuery = gql`
  query CardQuery($name: String!) {
    card(name: $name) { 
      id
      caseName
      name
      age
    }
  }
`;

const addCardMutation = gql`
  mutation addCard($i: CreateCardInput!) {
    addCard(i: $i) {
      caseName
      name
      sex
      age
    }
  }
`;

const deleteCardMutation = gql`
  mutation deleteCard($caseName: String!) {
    deleteCard(caseName: $caseName) {
      caseName #只返回caseName
    }
  }
`;

export { 
  cardsListQuery, cardQuery, addCardMutation, deleteCardMutation
};
