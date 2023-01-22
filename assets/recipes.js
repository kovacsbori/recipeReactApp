import React, { useState, createContext } from "react";

const RecipesContext = createContext([{}, () => {}]);

const RecipesProvider = () => {
  const [state, setState] = useState([  
    {
        id: 1,
        title: 'Butter Chicken',
        description: 'Traditional Indian chicken curry with butter. Usually served with basmati rice or naan bread.',
        imageURL: 'https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg',
        isLiked: false
    },
    {
        id: 2, 
        title: 'Khachapuri',
        description: 'This soft, cheese-filled bread is the national dish of the country of Georgia. Georgians typically serve khachapuri for breakfast or enjoy it at lunch; either way, it\'s a traditional way to welcome friends and family to the table. ',
        imageURL: 'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2021-02/khachapuri.jpg?itok=PGjSYSJk',
        isLiked: false
    },
    {
        id: 3,
        title: 'Falafel',
        description: 'Falafel is a popular Middle Eastern “fast food” made of a mixture of chickpeas (or fava beans), fresh herbs, and spices that are formed into a small patties or balls.',
        imageURL: 'https://www.themediterraneandish.com/wp-content/uploads/2020/02/falafel-recipe-10-1024x1536.jpg',
        isLiked: false
    }]);
}

export { RecipesContext, RecipesProvider };