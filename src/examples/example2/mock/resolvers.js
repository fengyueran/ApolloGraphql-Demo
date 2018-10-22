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

let nextId = 3;

export const resolvers = {
  Query: {
    cards: () => cards,
    card: (root, { name }) => {
      const foundCard = cards.find(card => card.name === name);
      return foundCard;
    }
  },
  Mutation: {
    addCard: (root, { i }) => {
      const newCard = { id: nextId++, ...i };
      cards.push(newCard);
      console.log('add card', cards);
      return newCard;
    },
    deleteCard: (root, args) => {
      cards.splice(0, 1);
      console.log('delete card', root);
      return cards[0];
    }

  }

};