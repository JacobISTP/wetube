import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, trim: true, required: true, unique: true },
  name: { type: String, trim: true, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  location: String,
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
