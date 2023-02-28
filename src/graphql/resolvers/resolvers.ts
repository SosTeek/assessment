import { GraphQLResolveInfo } from 'graphql';

import userController from '../../controllers/userController';

const resolvers  = {
    Query: {
        users: (_: void, args: any, _info: GraphQLResolveInfo) => {
            return userController.getAllUsers(args)},
    },

    Mutation :{
        createUser: (_: void, inputObject: any) => {
            return userController.addUser(inputObject);

        }
    }
};

export default resolvers;