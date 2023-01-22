import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList } from 'react-native';
import RecipeArticle from '../components/RecipeArticle';
import * as SQLite from 'expo-sqlite';
import { UserContext } from '../UserContext';


function RecipeListScreen({ navigation }) {
    const { userId } = useContext(UserContext);
    const [allRecipes, setAllRecipes] = useState([]);
    const [likedRecipes, setLikedRecipes] = useState([]);

    const addLikeHandler = (recipeId) => {
        const db = SQLite.openDatabase("recipeApp");
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM likes WHERE userId = ${userId} AND recipeId = ${recipeId}`,
                [],
                (_, res) => {
                    if (res.rows._array.length > 0) {
                        tx.executeSql(
                            `DELETE FROM likes WHERE userId = ${userId} AND recipeId = ${recipeId}`,
                            [], 
                            (_, res) => console.log("Deleted row successfully"), 
                            (_, error) => console.log(error));
                    } else {
                        tx.executeSql(
                            `INSERT INTO likes (userId, recipeId) VALUES (${userId}, ${recipeId})`,
                            [], 
                            (_, res) => console.log("Inserted row successfully"), 
                            (_, error) => console.log(error));
                    }
                    updateLikedRecipes(db);
                },
                (_, error) => console.log(error)
            )
        });
    };

    const updateLikedRecipes = (db) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT recipeId FROM likes WHERE userId = ${userId}`,
                [],
                (_, res) => {
                    setLikedRecipes(res.rows._array);
                },
                (_, error) => console.log(error)
            )
        })
    }

    const updateRecipeList = (db) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM recipes',
                [],
                (_, res) => {
                    setAllRecipes(res.rows._array);
                },
                (_, error) => console.log(error)
            )
        });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const db = SQLite.openDatabase("recipeApp");
            updateRecipeList(db);
            updateLikedRecipes(db);
        });
        return unsubscribe;
      }, [navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                data={allRecipes}
                renderItem={({ item }) => (
                        <RecipeArticle
                            id={item.id}
                            title={item.title}
                            ingredients={item.ingredients}
                            description={item.description}
                            imageURL={item.imageURL}
                            isLiked={likedRecipes.some(v => (v.recipeId == item.id))}
                            onLike={() => addLikeHandler(item.id)}
                        />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

export default RecipeListScreen;