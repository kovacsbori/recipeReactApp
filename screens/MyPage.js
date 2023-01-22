import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList } from 'react-native';
import RecipeArticle from '../components/RecipeArticle';
import * as SQLite from 'expo-sqlite';
import { UserContext } from '../UserContext';

const MyPage = ({ navigation }) => {
    const { userId } = useContext(UserContext);
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
                `SELECT * FROM likes JOIN recipes ON likes.recipeId = recipes.id WHERE userId = ${userId}`,
                [],
                (_, res) => {
                    setLikedRecipes(res.rows._array);
                },
                (_, error) => console.log(error)
            )
        })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const db = SQLite.openDatabase("recipeApp");
            updateLikedRecipes(db);
        });
        return unsubscribe;
      }, [navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                data={likedRecipes}
                renderItem={({ item }) => (
                    <RecipeArticle
                            id={item.id}
                            title={item.title}
                            ingredients={item.ingredients}
                            description={item.description}
                            imageURL={item.imageURL}
                            isLiked={true}
                            onLike={() => addLikeHandler(item.id)}
                        />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

export default MyPage;