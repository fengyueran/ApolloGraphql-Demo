const cards = [{
  id: 1,
  name: 'snow',
  sex: 'male'
}, {
  id: 2,
  name: 'lucy',
  sex: 'female'
}];

export const resolvers = {
  Query: {
    cards: () => cards
  }
};