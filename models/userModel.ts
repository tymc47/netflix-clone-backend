import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { User } from "../types";

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  list: [],
});

userSchema.plugin(uniqueValidator);
userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = String(returnedObject._id);
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
