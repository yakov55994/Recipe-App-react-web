import User from '../models/UserModel.js';
// import bcrypt from 'bcryptjs'

const userService = {
  registerUser: async (username, email, password) => {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) throw new Error('Username or Email already exists');
  
    const newUser = new User({ username, email, password });
    await newUser.save();
    return newUser;
  },
  
  getUserByEmail: async (email) => {
    return await User.findOne({ email });
  }

}
export default userService;