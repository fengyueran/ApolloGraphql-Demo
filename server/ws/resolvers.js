import { PubSub, withFilter } from 'graphql-subscriptions';
import faker from 'faker';

const pubsub = new PubSub();
const channels = [{
  id: '1',
  name: 'Channel 1',
  messages: [{
    id: '1',
    createdAt: '2018',
    text: 'soccer is football',
  }, {
    id: '2',
    createdAt: '2019',
    text: 'hello soccer world cup',
  }]
}, {
  id: '2',
  name: 'Channel 2',
  messages: [{
    id: '3',
    createdAt: '2020',
    text: 'baseball is life',
  }, {
    id: '4',
    createdAt: '2021',
    text: 'hello baseball world series',
  }]
}];

let nextId = 3;
let nextMessageId = 5;

let messageCreatedAt = 123456789;

function addChannel(name) {
  nextId++;
  const newChannel = {
    id: String(nextId),
    name,
    messages: [],
  };
  channels.push(newChannel);
  return nextId;
}

function getChannel(id) {
  return channels.find(channel => channel.id === id);
}

function addFakeMessage(channel, messageText) {
  nextMessageId++;
  messageCreatedAt++;
  const newMessage = {
    id: nextMessageId,
    createdAt: messageCreatedAt,
    text: messageText,
  };
  channel.messages.push(newMessage);
}

// use faker to generate random messages in faker channel
addChannel('faker');
const fakerChannel = channels.find(channel => channel.name === 'faker');

// Add seed for consistent random data
faker.seed(9);
for (let i = 0; i < 50; i++) {
  addFakeMessage(fakerChannel, faker.random.words());
}


export const resolvers = {
  Query: {
    channels: () => channels,
    channel: (root, { id }) => channels.find(channel => channel.id === id),
  },
  Channel: {
    messageFeed: (channel, { cursor }) => {
      console.log('messageFeed', channel.messages);
      // The cursor passed in by the client will be an
      // integer timestamp. If no cursor is passed in,
      // set the cursor equal to the time at which the
      // last message in the channel was created.
      if (!cursor) {
        cursor = channel.messages[channel.messages.length - 1].createdAt;
      }
      cursor = parseInt(cursor, 10);

      // limit is the number of messages we will return.
      // We could pass it in as an argument but in this
      // case let's use a static value.
      const limit = 10;

      const newestMessageIndex = channel.messages.findIndex(
        message => message.createdAt === cursor
      );
      // find index of message created at time held in cursor
      // We need to return a new cursor to the client so that it
      // can find the next page. Let's set newCursor to the
      // createdAt time of the last message in this messageFeed:
      const message = channel.messages[newestMessageIndex - limit];
      const newCursor = message ? message.createdAt : channel.messages[0].createdAt;

      const messageFeed = {
        messages: channel.messages.slice(
          newestMessageIndex - limit,
          newestMessageIndex
        ),
        cursor: newCursor,
      };
      return messageFeed;
    }
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
       
      const newMessage = { 
        id: String(nextMessageId++),
        text: message.text,
        createdAt: messageCreatedAt++
      };
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