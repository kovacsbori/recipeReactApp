import { insertIntoRecipes } from "./SQLiteUtils"

export const insertTestData = () => {
    insertIntoRecipes(
      1, 
      "Butter Chicken", 
      "28 oz (800g) boneless and skinless chicken thighs or breasts cut into bite-sized pieces, 1/2 cup plain yogurt, 1/2 tablespoons minced garlic, tablespoon minced ginger (or finely grated), teaspoons garam masala, teaspoon turmeric, teaspoon ground cumin, teaspoon red chili powder, teaspoon of salt, 2 tablespoons olive oil, 2 tablespoons ghee (or 1 tbs butter + 1 tbs oil), 1 large onion, sliced or chopped, 1 1/2 tablespoons garlic (minced), 1 tablespoon ginger, minced or finely grated, 1 1/2 teaspoons ground cumin, 1 1/2 teaspoons garam masala, 1 teaspoon ground coriander, 14 oz (400 g) crushed tomatoes, 1 teaspoon red chili powder (adjust to your taste preference), 1 1/4 teaspoons salt (or to taste), 1 cup of heavy or thickened cream (or evaporated milk to save calories), 1 tablespoon sugar, 1/2 teaspoon kasoori methi (or dried fenugreek leaves)",
      "In a bowl, combine chicken with all of the ingredients for the chicken marinade; let marinate for 30 minutes to an hour (or overnight if time allows).\n \
      Heat oil in a large skillet or pot over medium-high heat. When sizzling, add chicken pieces in batches of two or three, making sure not to crowd the pan. Fry until browned for only 3 minutes on each side. Set aside and keep warm. (You will finish cooking the chicken in the sauce.)\n \
      Heat butter or ghee in the same pan. Fry the onions until they start to sweat (about 6 minutes) while scraping up any browned bits stuck on the bottom of the pan.\n  \
      Add garlic and ginger and sauté for 1 minute until fragrant, then add ground coriander, cumin and garam masala. Let cook for about 20 seconds until fragrant, while stirring occasionally.\n \
      Add crushed tomatoes, chili powder and salt. Let simmer for about 10-15 minutes, stirring occasionally until sauce thickens and becomes a deep brown red colour.\n \
      Remove from heat, scoop mixture into a blender and blend until smooth. You may need to add a couple tablespoons of water to help it blend (up to 1/4 cup). Work in batches depending on the size of your blender.\n \
      Pour the puréed sauce back into the pan. Stir the cream, sugar and crushed kasoori methi (or fenugreek leaves) through the sauce. Add the chicken with juices back into the pan and cook for an additional 8-10 minutes until chicken is cooked through and the sauce is thick and bubbling.\n \
      Garnish with chopped cilantro and serve with fresh, hot garlic butter rice and fresh homemade Naan bread!\n", 
      'https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg')
    insertIntoRecipes(
      2, 
      "Khachapuri", 
      "all-purpose flour, salt, dry active yeast, granulated sugar, water, milk, olive oil, Farmers cheese, Shredded mozzarella, Feta cheese, eggs, unsalted Butter",
      "Combine flour, salt, yeast, and sugar in a bowl. Then add warm milk. Using the hook attachment, knead the dough until it takes shape. Then add oil and knead some more.\n \
      Place the dough in a greased bowl. Cover and let it double in size. Remove from bowl and divide the dough into 4 boat-shaped pieces. Place the bread boast on a baking sheet lined with parchment.\n \
      Combine the three kinds of cheese and fill each bread boat. Using a pastry brush, brush with egg wash and bake for 15 minutes at 450 degrees Fahrenheit. Pull the khachapuri out of the oven, then make a well in the middle. Drop the egg in the center, add pieces of butter to the melted cheese, and bake for another 5-6 minutes.\n",
      "https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2021-02/khachapuri.jpg?itok=PGjSYSJk")
    insertIntoRecipes(
      3, 
      "Falafel", 
      "1 cup dried chickpeas, soaked overnight (don't use canned chickpeas), 1/2 cup onion, roughly chopped, 1 cup parsley, roughly chopped (about a one large bunch), 1 cup cilantro, roughly chopped (about a one large bunch), 1 small green chile pepper, serrano or jalapeno pepper, 3 garlic cloves, 1 tsp cumin, 1 tsp salt, 1/2 tsp cardamom, 1/4 tsp black pepper, 2 tbsp chickpea flour, 1/2 tsp baking soda, avocado oil for frying",
      "Soak your dried chickpeas. Overnight or for at least 8-12 hours. Note that the chickpeas will triple in size, so cover them with plenty of water. Then drain and rinse them.\n \
      Add all the ingredients to a food processor. Add the chickpeas, onion, parsley, cilantro, garlic, green pepper and spices to a food processor. I recommend roughly chopping up the onion, herbs and pepper before adding. Pulse the food processor but do not blend completely. The final mixture should resemble coarse sand.\n \
      Transfer the mixture to a bowl. Then add the chickpea flour and baking soda, stir it together until it’s fully combined and cover with plastic wrap or a lid.\n \
      Place the bowl in the fridge. Chill the falafel mixture for 30 minutes to 1 hour.\n \
      Shape your falafel. You can do this by hand, with a cookie scoop (which is what I use) or a falafel scoop. Decide if you’d like round balls or flatter patty shapes. The flatter shapes are better if you plan to pan fry or bake. Any shape can be used for deep frying. Form all your falafel and place on a plate.\n",
      "https://www.themediterraneandish.com/wp-content/uploads/2020/02/falafel-recipe-10-1024x1536.jpg")
  }
  