const {AuthenticationError} = require('apollo-server-express');
const { Book, User } = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User
                    .findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('books');
                return userData;
            }

            throw new AuthenticationError('Please log in to use this feature.');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user =  await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if (!user) {
                throw new AuthenticationError('No user with this email found!');
              }
        
              const correctPw = await user.isCorrectPassword(password);
        
              if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
              }
        
              const token = signToken(user);
              return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
            const updateUser = await User
                .findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: args}},
                    {new: true}
                )
                .populate('books');
            return updateUser;
            }
            throw new AuthenticationError('Please log in to use this feature.');
        },
        removeBook: async (parent,{bookId}, context) => {
            if (context.user) {
                const updateUser = await User
                    .findByIdAndUpdate(
                        {_id: context.user._id},
                        {$pull: {savedBooks: {bookId}}},
                        {new: true}
                    )
                return updateUser;
            }
            throw new AuthenticationError('Please log in to use this feature.');
        }
    }
};

module.exports = resolvers