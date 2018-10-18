export const resolvers = {
  Query: {
    cards: () => {
      const cards = [
        { name: 'lily' },
        { name: 'lucy' }
      ];
      return cards;
    }
  }
};