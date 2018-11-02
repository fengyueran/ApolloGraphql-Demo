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

const addChannelMutation = gql`
  mutation addChannel($name: String!) { #必须与schema一致
    addChannel(name: $name) {
      id
      name
    }
  }
`;

const deleteChannelMutation = gql`
  mutation deleteChannel($id: String!) {
    deleteChannel(id: $id) {
      id #只返回name
    }
  }
`;

export { 
  channelsListQuery, addChannelMutation, deleteChannelMutation, cardDetailsQuery
};
