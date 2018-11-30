import gql from 'graphql-tag';


const channelQuery = gql`
  query ChannelQuery($channelId : ID!) {
    channel(id: $channelId) {
      id
      name
    }
  }
`;

const serverAddressQuery = gql`
  query ServerAddressQuery {
    serverAddress 
  }
`;

const channelsListQuery = gql`
  query ChannelsListQuery {
    channels { # 返回channels数组，数组每个元素包含id和name, 返回的元素应为schema中channel类型字段的子集
      id
      name
    }
  }
`;

const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId : ID!, $cursor: String) {
    channel(id: $channelId) {
      id
      name
      messageFeed(cursor: $cursor) @connection(key: "messageFeed") {
        cursor
        messages {
          id
          text
        }
      }
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

const addMessageMutation = gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;

export { 
  channelQuery, channelsListQuery, addChannelMutation, deleteChannelMutation, addMessageMutation, 
  channelDetailsQuery, serverAddressQuery
};
