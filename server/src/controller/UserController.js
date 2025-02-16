import userService from '../services/UserService.js'
import jwt from 'jsonwebtoken';

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

        const token = jwt.sign(
            { _id: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // שליחת ה-token גם ב-cookie וגם בגוף התגובה
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000,
        });

        // שליחת ה-token בגוף התגובה
        res.status(200).json({ 
            message: 'Login successful', 
            user,
            token // הוספת ה-token לגוף התגובה
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
},

  getUserById: async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);  // קריאה לסרוויס

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);  // מחזיר את המידע על המשתמש
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
},
  likeRecipe: async (req, res) => {
    console.log("🔹 Received Data:", req.body);

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
},
  getFavorites: async (req, res) => {
    const { userId } = req.params;  // נקבל את ה-ID של המשתמש מה-params של הבקשה
    try {
      const result = await userService.getFavorites(userId); // קוראים לפונקציה בסרוויס
      if (result.status === 200) {
        return res.status(200).json(result.data); // מחזירים את המתכונים המועדפים
      }
      return res.status(result.status).json(result.data);
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred while fetching favorites' });
    }
  },
  deleteFavoriteRecipe: async (req, res) => {
    try {
      // console.log(req.user);
      const {userId} = req.body; // מזהה המשתמש מתוך ה-Token
      const { recipeId } = req.params;
  
      const result = await userService.removeFavoriteRecipe (userId, recipeId);
      
      res.status(200).json(result);
    } catch (error) {
      console.error("❌ שגיאה במחיקת המתכון:", error.message);
      res.status(500).json({ message: error.message });
    }
  }
  
}
export default userController;