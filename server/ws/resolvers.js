import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();
const channels = [{
  id: '1',
  name: 'Channel 1',
  time: '2018',
  messages: [{
    id: '1',
    text: 'soccer is football',
  }, {
    id: '2',
    text: 'hello soccer world cup',
  }]
}, {
  id: '2',
  name: 'Channel 2',
  time: '2018',
  messages: [{
    id: '3',
    text: 'baseball is life',
  }, {
    id: '4',
    text: 'hello baseball world series',
  }]
}];

let nextId = 3;
let nextMessageId = 5;

export const resolvers = {
  Query: {
    channels: () => channels,
    channel: (root, { id }) => channels.find(channel => channel.id === id),
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
      const foundIndex = channels.findIndex(ch => ch.id === id);
      let foundChannel;
      if (foundIndex >= 0) {
        foundChannel = channels[foundIndex];
        channels.splice(foundIndex, 1);
      }
      console.log('delete card', foundChannel);
      return foundChannel;
    },
    addMessage: (root, { message }) => {
      const channel = channels.find(ch => ch.id === message.channelId);
      if (!channel) {
        throw new Error("Channel does not exist");
      }
       
      const newMessage = { id: String(nextMessageId++), text: message.text };
      channel.messages.push(newMessage);
      return newMessage;
    },

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