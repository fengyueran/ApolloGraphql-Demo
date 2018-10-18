import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  #数据类型
  type Card {
    id: ID!   # "!" 为必填
    name: String
  }

  #数据查询
  type Query {
    cards: [Card]
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
addMockFunctionsToSchema({ schema });

export { schema };