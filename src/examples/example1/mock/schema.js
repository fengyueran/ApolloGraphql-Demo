import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  #数据类型
  type Card {
    id: ID!   # "!" 表示必填参数
    caseName: String
    name: String
    sex: String
  }

  #数据查询
  type Query {
    cards: [Card]
  }

  #数据修改
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema }); //快速构建mock函数， resolvers自定义

export { schema };