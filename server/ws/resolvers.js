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
      console.log('add new message', newMessage);
      pubsub.publish('messageAdded', { messageAdded: newMessage, channelId: message.channelId });
      return newMessage;
    },

  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator('messageAdded'), (payload, variables) => {
        // The `messageAdded` channel includes events for all channels, so we filter to only
        // pass through events for the channel specified in the query
        console.log('payload channelId', payload.channelId);
        console.log('variables channelId', variables.channelId);
        return payload.channelId === variables.channelId;
      })
      // subscribehttp://localhost:1989/example1/channel/1: () => pubsub.asyncIterator(['messageAdded'])
    }
  }


};