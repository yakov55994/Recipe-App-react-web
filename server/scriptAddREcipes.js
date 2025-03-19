import mongoose from 'mongoose';
import Recipe from './src/models/recipeModel.js'; // לוודא שזה הנתיב הנכון
import dotenv from 'dotenv';

dotenv.config();


let recipes = [
    {
        "title": "מרק עדשים כתומות (פרווה)",
        "ingredients": ["עדשים כתומות", "בצל", "גזר", "סלרי", "שום", "כמון", "כורכום", "ציר ירקות", "שמן זית", "מלח", "פלפל"],
        "instructions": ["לטגן בצל, גזר וסלרי.", "להוסיף שום ותבלינים.", "להוסיף עדשים וציר ירקות.", "לבשל עד שהעדשים רכות.", "לטחון למרקם חלק."],
        "preparationTime": 15,
        "cookingTime": 30,
        "servings": 6,
        "imageUrl": "url_to_lentil_soup_image",
        "difficulty": "Easy",
        "categories": { "mainCategory": "Fur", "subCategory": "Soups" },
        "description": "מרק חורפי חם ומשביע.",
        "user": null
    },
    {
        "title": "מרק עוף עם אטריות (בשרי)",
        "ingredients": ["עוף", "גזר", "סלרי", "בצל", "אטריות", "ציר עוף", "פטרוזיליה", "מלח", "פלפל"],
        "instructions": ["לבשל עוף עם ירקות.", "לסנן את הציר ולהוסיף אטריות.", "להוסיף עוף מפורק ופטרוזיליה."],
        "preparationTime": 20,
        "cookingTime": 45,
        "servings": 6,
        "imageUrl": "url_to_chicken_noodle_soup_image",
        "difficulty": "Medium",
        "categories": { "mainCategory": "Meat", "subCategory": "Soups" },
        "description": "מרק עוף קלאסי ומנחם.",
        "user": null
    },
    {
        "title": "פשטידת ירקות (פרווה)",
        "ingredients": ["ברוקולי", "כרובית", "גזר", "בצל", "קמח", "ביצים", "שמן זית", "תבלינים"],
        "instructions": ["לאדות ירקות.", "לערבב עם קמח, ביצים ותבלינים.", "לאפות בתנור."],
        "preparationTime": 25,
        "cookingTime": 40,
        "servings": 8,
        "imageUrl": "url_to_vegetable_quiche_image",
        "difficulty": "Medium",
        "categories": { "mainCategory": "Fur", "subCategory": "Dishes" },
        "description": "פשטידה צבעונית וטעימה.",
        "user": null
    },
    {
        "title": "לזניה בשרית",
        "ingredients": ["דפי לזניה", "בשר טחון", "רוטב עגבניות", "בצל", "שום", "גבינת ריקוטה", "גבינת מוצרלה", "תבלינים"],
        "instructions": ["להכין רוטב בשר.", "להרכיב את הלזניה בשכבות.", "לאפות בתנור."],
        "preparationTime": 30,
        "cookingTime": 50,
        "servings": 8,
        "imageUrl": "url_to_meat_lasagna_image",
        "difficulty": "Hard",
        "categories": { "mainCategory": "Meat", "subCategory": "Dishes" },
        "description": "לזניה עשירה ומשביעה.",
        "user": null
    },
    {
        "title": "עוגת גבינה אפויה",
        "ingredients": ["גבינה לבנה", "ביצים", "סוכר", "קמח", "תמצית וניל"],
        "instructions": ["לערבב את החומרים.", "לאפות בתנור.", "לקרר לפני ההגשה."],
        "preparationTime": 20,
        "cookingTime": 60,
        "servings": 10,
        "imageUrl": "url_to_cheesecake_image",
        "difficulty": "Medium",
        "categories": { "mainCategory": "Dairy", "subCategory": "Desserts" },
        "description": "עוגת גבינה קלאסית וטעימה.",
        "user": null
    },
    {
        "title": "עוגיות שוקולד צ'יפס (פרווה)",
        "ingredients": ["קמח", "סוכר", "שמן קוקוס", "שוקולד צ'יפס", "תמצית וניל"],
        "instructions": ["לערבב את החומרים.", "ליצור כדורים.", "לאפות בתנור."],
        "preparationTime": 15,
        "cookingTime": 12,
        "servings": 24,
        "imageUrl": "url_to_chocolate_chip_cookies_image",
        "difficulty": "Easy",
        "categories": { "mainCategory": "Fur", "subCategory": "Desserts" },
        "description": "עוגיות שוקולד צ'יפס טעימות וקלות להכנה.",
        "user": null
    },
    {
        "title": "מרק בצל צרפתי",
        "ingredients": ["בצל", "ציר בקר", "יין אדום", "גבינה צהובה", "לחם"],
        "instructions": ["לטגן בצל עד להזהבה.", "להוסיף ציר ויין.", "לבשל ולצקת על לחם עם גבינה.", "לאפות בתנור."],
        "preparationTime": 20,
        "cookingTime": 40,
        "servings": 4,
        "imageUrl": "url_to_french_onion_soup_image",
        "difficulty": "Medium",
        "categories": { "mainCategory": "Meat", "subCategory": "Soups" },
        "description": "מרק בצל צרפתי חם ומנחם.",
        "user": null
    },
    {
        "title": "סלט קינואה עם ירקות קלויים",
        "ingredients": ["קינואה", "ירקות (בטטה, ברוקולי, כרובית)", "שמן זית", "תבלינים"],
        "instructions": ["לבשל קינואה.", "לקלות ירקות בתנור.", "לערבב את הכל עם שמן זית ותבלינים."],
        "preparationTime": 20,
        "cookingTime": 30,
        "servings": 4,
        "imageUrl": "url_to_quinoa_salad_image",
        "difficulty": "Easy",
        "categories": { "mainCategory": "Fur", "subCategory": "Dishes" },
        "description": "סלט בריא ומשביע עם קינואה וירקות קלויים.",
        "user": null
    },
    {
        "title": "פסטה ברוטב שמנת פטריות",
        "ingredients": ["פסטה", "פטריות", "שמנת מתוקה", "שום", "פרמזן"],
        "instructions": ["לבשל פסטה.", "לטגן פטריות ושום.", "להוסיף שמנת ופרמזן.", "לערבב עם הפסטה."],
        "preparationTime": 15,
        "cookingTime": 20,
        "servings": 4,
        "imageUrl": "url_to_mushroom_cream_pasta_image",
        "difficulty": "Easy",
        "categories": { "mainCategory": "Dairy", "subCategory": "Dishes" },
        "description": "פסטה קרמית וטעימה עם פטריות.",
        "user": null
    },
    {
        "title": "עוגת שוקולד",
        "ingredients": ["קמח", "סוכר", "קקאו", "ביצים", "שמן", "מים"],
        "instructions": ["לערבב את החומרים.", "לאפות בתנור.", "לצנן ולהגיש."],
        "preparationTime": 20,
        "cookingTime": 35,
        "servings": 8,
        "imageUrl": "url_to_chocolate_cake_image",
        "difficulty": "Easy",
        "categories": { "mainCategory": "Fur", "subCategory": "Desserts" },
        "description": "עוגת שוקולד בסיסית וטעימה.",
        "user": null
    },
    {
        "title": "פשטידת בצל",
        "ingredients": ["בצל", "ביצים", "קמח", "שמן זית", "תבלינים"],
        "instructions": ["לטגן בצל עד להזהבה.", "לערבב עם ביצים וקמח.", "לאפות בתנור."],
        "preparationTime": 15,
        "cookingTime": 40,
        "servings": 6,
        "imageUrl": "url_to_onion_quiche_image",
        "difficulty": "Medium",
        "categories": { "mainCategory": "Fur", "subCategory": "Dishes" },
        "description": "פשטידה טעימה וקלה להכנה עם בצל מקורמל.",
        "user": null
    },
    {
        "title": "מרק מינסטרונה",
        "ingredients": ["שעועית", "גזר", "סלרי", "בצל", "עגבניות", "פסטה קטנה", "ציר ירקות"],
        "instructions": ["לטגן בצל, גזר וסלרי.", "להוסיף שעועית ועגבניות.", "להוסיף ציר ופסטה.", "לבשל עד שהפסטה רכה."],
        "preparationTime": 20,
        "cookingTime": 35,
        "servings": 6,
        "imageUrl": "url_to_minestrone_soup_image",
        "difficulty": "Medium",
        "categories": { "mainCategory": "Fur", "subCategory": "Soups" },
        "description": "מרק ירקות איטלקי עשיר ומשביע.",
        "user": null
    },
    {
        "title": "עוף בתנור עם תפוחי אדמה",
        "ingredients": ["עוף", "תפוחי אדמה", "בצל", "שום", "שמן זית", "תבלינים"],
        "instructions": ["לתבל את העוף ותפוחי האדמה.", "לאפות בתנור עד שהעוף מוכן."],
        "preparationTime": 20,
        "cookingTime": 60,
        "servings": 4,
        "imageUrl": "url_to_baked_chicken_potatoes_image",
        "difficulty": "Medium",
        "categories": { "mainCategory": "Meat", "subCategory": "Dishes" },
        "description": "ארוחה קלאסית וטעימה עם עוף ותפוחי אדמה.",
        "user": null
    },
    {
        "title": "פנקייקים",
        "ingredients": ["קמח", "ביצים", "חלב", "סוכר", "אבקת אפייה"],
        "instructions": ["לערבב את החומרים.", "לצקת על מחבת חמה.", "לטגן משני הצדדים."],
        "preparationTime": 10,
        "cookingTime": 15,
        "servings": 4,
        "imageUrl": "url_to_pancakes_image",
        "difficulty": "Easy",
        "categories": { "mainCategory": "Dairy", "subCategory": "Desserts" },
        "description": "פנקייקים רכים וטעימים לארוחת בוקר.",
        "user": null
    },
    {
        "title": "סלט טאבולה",
        "ingredients": ["בורגול", "פטרוזיליה", "נענע", "עגבניות", "מלפפון", "לימון", "שמן זית"],
        "instructions": ["להשרות בורגול במים.", "לקצוץ ירקות ועשבי תיבול.", "לערבב את הכל עם לימון ושמן זית."],
        "preparationTime": 20,
        "cookingTime": 0,
        "servings": 4,
        "imageUrl": "url_to_tabbouleh_salad_image",
        "difficulty": "Easy",
        "categories": { "mainCategory": "Fur", "subCategory": "Dishes" },
        "description": "סלט רענן וטעים מהמטבח הלבנוני.",
        "user": null
    },
    {
        "title": "מרק ברוקולי",
        "ingredients": ["ברוקולי", "בצל", "שום", "ציר ירקות", "שמנת צמחית"],
        "instructions": ["לטגן בצל ושום.", "להוסיף ברוקולי וציר ירקות.", "לבשל עד שהברוקולי רך.", "לטחון למרקם חלק ולהוסיף שמנת צמחית."],
        "preparationTime": 15,
        "cookingTime": 25,
        "servings": 4,
        "imageUrl": "url_to_broccoli_soup_image",
        "difficulty": "Easy",
        "categories": { "mainCategory": "Fur", "subCategory": "Soups" },
        "description": "מרק ברוקולי קרמי ובריא.",
        "user": null
    },
    {
        "title": "קציצות בקר ברוטב עגבניות",
        "ingredients": ["בשר טחון", "בצל", "שום", "פירורי לחם", "ביצה", "עגבניות מרוסקות", "תבלינים"],
        "instructions": ["לערבב את הבשר עם בצל, שום, פירורי לחם, ביצה ותבלינים.", "לטגן קציצות.", "לבשל עם רוטב עגבניות."],
        "preparationTime": 25,
        "cookingTime": 45,
        "servings": 6,
        "imageUrl": "url_to_meatballs_image",
        "difficulty": "Medium",
        "categories": { "mainCategory": "Meat", "subCategory": "Dishes" },
        "description": "קציצות בקר טעימות ברוטב עגבניות.",
        "user": null
    }
];


// התחברות ל-MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('התחברות ל- MongoDB הצליחה');

    // קבלת כל כותרות המתכונים מתוך המערך recipes
    const recipeTitles = recipes.map(recipe => recipe.title);

    // מחיקת כל המתכונים שהכותרת שלהם נמצאת במערך recipeTitles
    Recipe.deleteMany({ title: { $in: recipeTitles } })
      .then(result => {
        console.log(`${result.deletedCount} מתכונים נמחקו`);
      })
      .catch(error => {
        console.error('שגיאה במחיקת המתכונים:', error);
      })
      .finally(() => {
        // ניתוק ממסד הנתונים
        mongoose.disconnect();
      });
  })
  .catch(err => {
    console.error('לא הצלחנו להתחבר ל-MongoDB:', err);
  });
