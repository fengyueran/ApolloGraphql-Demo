import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  # 用于创建Message的输入
  input MessageInput {
    channelId: ID!
    text: String
  }

  #数据类型
  type Message {
    id: ID!
    text: String
  }

  type Channel {
    id: ID!   # "!" 表示必填参数
    name: String
    time: String
    messages: [Message]
  }

  #数据查询
  type Query {
    channels: [Channel]  # "[]" 意味着返回数组，":"后为返回值
    channel(id: ID!): Channel
  }

  #数据修改
  type Mutation {
    addChannel(name: String!): Channel
    deleteChannel(id: String!): Channel
    addMessage(message: MessageInput!): Message
  }
`;

// Apollo Client Developer Tools
/*
  查询所有的type类型
  query {
    __schema {
      types {
        name
      }
    }
  }

  query {
    channels {
      id
      name
      time
    }
  }

  mutation {
  addChannel(name: "channel 3"){
    id
    name
  }
}
*/

// const schema = makeExecutableSchema({ typeDefs });
// addMockFunctionsToSchema({ schema }); // 快速构建mock函数

const schema = makeExecutableSchema({ typeDefs, resolvers });


export { schema };