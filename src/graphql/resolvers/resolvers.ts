import { GraphQLResolveInfo } from 'graphql';
import * as yup from "yup";

import userController from '../../controllers/userController';

const resolvers  = {
    Query: {
        // users: (_: void, args: any, _info: GraphQLResolveInfo) => {

        users: () => {
            return userController.getAllUsers()},
        //     return userController.getAllUsers(args)},
    },

    Mutation :{
        createUser: (_: void, inputObject: any) => {
            return userController.addUser(inputObject);

        }
    }
};

export default resolvers;