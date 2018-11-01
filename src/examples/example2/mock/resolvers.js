import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();
const cards = [{
  id: '1',
  caseName: 'HT-18CH7U',
  name: 'snow',
  sex: 'male',
  age: 17,
}, {
  id: '2',
  caseName: 'HT-18MZU3',
  name: 'lucy',
  sex: 'female',
  age: 18,
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
      pubsub.publish('cardAdded', { cardAdded: newCard, cardId: nextId });
      return newCard;
    },
    deleteCard: (root, args) => {
      cards.splice(0, 1);
      console.log('delete card', root);
      return cards[0];
    },
    updateCard: (root, { id, age }) => {
      console.log('55555555');
      const index = cards.findIndex(card => card.id === id);
      let foundedCard;
      if (index >= 0) {
        foundedCard = cards[index];
        foundedCard.age = age;
        cards[index] = foundedCard;
      }

      return foundedCard;
    }

  },
  Subscription: {
    cardAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator('cardAdded'), (payload, variables) => {
        // The `messageAdded` channel includes events for all channels, so we filter to only
        // pass through events for the channel specified in the query
        return payload.cardId === variables.cardId;
      })
    }
  }


};