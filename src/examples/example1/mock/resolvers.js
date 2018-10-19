const cards = [{
  id: 1,
  caseName: 'HT-18CH7U',
  name: 'snow',
  sex: 'male'
}, {
  id: 2,
  caseName: 'HT-18MZU3',
  name: 'lucy',
  sex: 'female'
}];

export const resolvers = {
  Query: {
    cards: () => cards
  }
};