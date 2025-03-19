import express from "express";
import SearchController from '../controller/SearchController.js';

const router = express.Router();

router.get('/',SearchController.search)

router.post('/AI',SearchController.searchRecipeFromAI)


export default router;