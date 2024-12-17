import userService from '../services/UserService.js'

const userController = {

  // פונקציה להרשמה
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const newUser = await userService.registerUser(username, email, password);
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // פונקציה לבדוק אם המשתמש קיים
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userService.getUserByEmail(email);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid password' });
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default userController;