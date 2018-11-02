import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();
const channels = [{
  id: 1,
  name: 'Channel 1',
  time: '2018',
}, {
  id: 2,
  name: 'Channel 2',
  time: '2018',
}];

// let nextId = 3;

export const resolvers = {
  Query: {
    channels: () => channels,
  },
  // Mutation: {
  //   addCard: (root, { i }) => {
  //     const newCard = { id: nextId++, ...i };
  //     cards.push(newCard);
  //     console.log('add card', cards);
  //     pubsub.publish('cardAdded', { cardAdded: newCard, cardId: nextId });
  //     return newCard;
  //   },
  //   deleteCard: (root, args) => {
  //     cards.splice(0, 1);
  //     console.log('delete card', root);
  //     return cards[0];
  //   },
  //   updateCard: (root, { id, age }) => {
  //     console.log('55555555');
  //     const index = cards.findIndex(card => card.id === id);
  //     let foundedCard;
  //     if (index >= 0) {
  //       foundedCard = cards[index];
  //       foundedCard.age = age;
  //       cards[index] = foundedCard;
  //     }

  //     return foundedCard;
  //   }

  // },
  // Subscription: {
  //   cardAdded: {
  //     // subscribe: withFilter(() => pubsub.asyncIterator('cardAdded'), (payload, variables) => {
  //     //   // The `cardAdded` card includes events for all cards, so we filter to only
  //     //   // pass through events for the channel specified in the query
  //     //   console.log('payload cardId', payload.cardId);
  //     //   console.log('variables cardId', variables.cardId);
  //     //   return payload.cardId === variables.cardId;
  //     // })
  //     subscribe: () => pubsub.asyncIterator(['cardAdded'])
  //   }
  // }


};