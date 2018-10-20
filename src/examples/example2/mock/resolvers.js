const dogs = [{
  id: 1,
  breed: 'Sharpei',
  name: 'lily',
  age: 10
}, {
  id: 2,
  breed: 'Husky',
  name: 'lucy',
  age: 5
}];

export const resolvers = {
  Query: {
    dogs: () => dogs,
    dog: (root, { breed }, context) => {
      const info = {
        Husky: 'lucy',
        Sharpei: 'lily',
      };
      return { id: 5, detail: info[breed] };
    },
  },
};