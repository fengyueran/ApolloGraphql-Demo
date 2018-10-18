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
export default typeDefs;