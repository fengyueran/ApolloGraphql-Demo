import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  # 用于创建 case 的输入
  input CreateCardInput {
      # Case名字
      caseName: String!
      sex: String
      name: String
      age: Int
  }

  #数据类型
  type Channel {
    id: ID!   # "!" 表示必填参数
    name: String
    time: String
  }

  #数据查询
  type Query {
    channels: [Channel]  # "[]" 意味着返回数组，":"后为返回值
  }

  #数据修改
  type Mutation {
    addChannel(name: String!): Channel
    deleteChannel(id: String!): Channel
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