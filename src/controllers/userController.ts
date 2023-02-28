import User from "../models/userModels";

const userController: any = {};

userController.getAllUsers = async (args: any) => {
  try {
    const users = User.find({ url: args["url"] });
    return users;
  } catch (error) {
    console.log(error);
  }
};

userController.addUser = async (inputObject: any) => {
    try {
        const user = await User.create(inputObject.input);
        return user;
    } catch (error) {
        console.log(error);
    }
}

export default userController;
