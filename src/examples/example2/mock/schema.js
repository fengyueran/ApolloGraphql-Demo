import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  #数据类型
  type Dog {
    id: ID!   # "!" 表示必填参数
    breed: String
    name: String
    age: Int
    detail: String
  }

  #数据查询
  type Query {
    dogs: [Dog]
    dog(breed: String!): Dog
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };