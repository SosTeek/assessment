import User from "../models/userModels";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup.string().email(),
  phone: yup.string().required("phone is required"),
});

const userController: any = {};

userController.getAllUsers = async () => {
  try {
    // const users = User.find({ url: args["url"] });
    const users = User.find();
    return users;
  } catch (error) {
    console.log(error);
  }
};

userController.addUser = async (inputObject: any) => {
  try {
    await validationSchema.validate(inputObject.input);
    // inputObject.input["dateOfBirth"] = new Date(inputObject.input["dateOfBirth"]);
    const user = await User.create(inputObject.input);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export default userController;
