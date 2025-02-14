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
  },

  likeRecipe: async (req, res) => {
    console.log("🔹 Received Data:", req.body); // בדוק את הנתונים שמגיעים

    const { userId, recipeId } = req.body;
    // console.log(req.body);
    if (!userId || !recipeId) {
        return res.status(400).json({ message: 'Missing userId or recipeId' });
    }

    try {
        const result = await userService.addRecipeToFavorites(userId, recipeId);
        res.status(result.status).json(result.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

}
export default userController;