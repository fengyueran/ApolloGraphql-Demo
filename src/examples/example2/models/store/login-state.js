const userInfoDefault = {
  username: null,
  password: null
};

const userState = {
  defaults: {
    userInfo: {
      ...userInfoDefault
    }
  },
  Mutation: {
    setUserInfo: (root, args, context, info) => {
      const { cache } = context;
      const data = {
        userInfo: {
          ...args,
          __typename: 'userInfo'
        }
      };

      cache.writeData({
        data
      });
      return null;
    }
  }
};

export { userInfoDefault, userState };