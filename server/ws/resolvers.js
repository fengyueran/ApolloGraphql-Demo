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

let nextId = 3;

export const resolvers = {
  Query: {
    channels: () => channels,
  },
  Mutation: {
    addChannel: (root, { name }) => {
      console.log('name', name);
      const newChannel = { id: nextId++, name };
      channels.push(newChannel);
      // pubsub.publish('cardAdded', { cardAdded: newCard, cardId: nextId });
      return newChannel;
    },
    deleteChannel: (root, args) => {
      const { id } = args;
      const foundIndex = channels.findIndex(ch => ch.id === +id);
      let foundChannel;
      if (foundIndex >= 0) {
        foundChannel = channels[foundIndex];
        channels.splice(foundIndex, 1);
      }
      console.log('delete card', foundChannel);
      return foundChannel;
    },
    // updateCard: (root, { id, age }) => {
    //   console.log('55555555');
    //   const index = cards.findIndex(card => card.id === id);
    //   let foundedCard;
    //   if (index >= 0) {
    //     foundedCard = cards[index];
    //     foundedCard.age = age;
    //     cards[index] = foundedCard;
    //   }

    //   return foundedCard;
    // }

  },
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