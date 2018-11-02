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
    card(name: String!): Card
  }

  #数据修改
  type Mutation {
    addCard(i: CreateCardInput): Card #返回Card类型数据(必须带返回值)
    deleteCard(caseName: String): Card
    updateCard(id: String, age: Int): Card
  }

  type Subscription {
    cardAdded(cardId: ID): Card
  }
`;

// Apollo Client Developer Tools
/*
  query {
    cards {
      id
      caseName
      name
      sex
    }
  }

  mutation {
  addCard(caseName: "HT-18YKI6"){
    id
    caseName
  }
}
*/

const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema }); //快速构建mock函数， resolvers自定义

export { schema };