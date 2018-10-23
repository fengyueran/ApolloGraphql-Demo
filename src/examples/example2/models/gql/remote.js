import gql from 'graphql-tag';

const cardsListQuery = gql`
  query CardsListQuery {
    cards {
      id
      caseName
      name
      sex
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
      sex
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

const updateCardMutation = gql`
  mutation updateCard($id: String!, $age: Int!) {
    updateCard(id: $id, age: $age) {
      id #必须返回id否则不能自动更新
      age 
    }
  }
`;

export { 
  cardsListQuery, cardQuery, addCardMutation, deleteCardMutation,
  updateCardMutation
};
