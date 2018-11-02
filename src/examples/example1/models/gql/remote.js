import gql from 'graphql-tag';

const channelsListQuery = gql`
  query ChannelsListQuery {
    channels { # 返回channels数组，数组每个元素包含id和name, 返回的元素应为schema中channel类型字段的子集
      id
      name
    }
  }
`;

const cardDetailsQuery = gql`
  query CardDetailsQuery($cardId: ID!) {
    cardDetail(id: $cardId) { 
      id
      name
      message
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

const deleteCardMutation = gql`
  mutation deleteCard($caseName: String!) {
    deleteCard(caseName: $caseName) {
      caseName #只返回caseName
    }
  }
`;

export { 
  channelsListQuery, addCardMutation, deleteCardMutation, cardDetailsQuery
};
