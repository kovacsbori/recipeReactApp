import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';
import { LinearGradient } from 'expo-linear-gradient';


const RecipeModal = (props) => {
    const createIngredientObject = (ingredients) => {
        const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());

        const ingredientsObjects = ingredientsArray.map((ingredient, index) => {
            return {
                key: index, // using index as key
                name: ingredient
            }
        });

        return ingredientsObjects
    }

    const Ingredients = createIngredientObject(props.ingredients);

    return (
        <GestureRecognizer
            style={{ flex: 1 }}
            onSwipeDown={() => props.onClose()}
        >
            <Modal visible={props.isVisible} animationType="slide">
                <ScrollView style={styles.modalContainer}>
                    <ImageBackground source={{ uri: props.imageURL }} style={styles.image}>
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.6)']}
                            style={{ height: '100%', width: '100%' }} />
                    </ImageBackground>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.heading}>Ingredients</Text>
                        <View style={{ paddingLeft: 15 }}>
                            {Ingredients.map((ingredient) => {
                                return (
                                    <View key={ingredient.key} style={{ marginVertical: 10 }}>
                                        <Text style={styles.item}>{`\u2022 ${ingredient.name}`}</Text>
                                    </View>
                                );
                            })}
                        </View>
                        <Text style={styles.heading}>Instructions</Text>
                        <Text style={styles.description}>{props.description}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={props.onClose}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <View style={styles.likeContainer}>
                                <TouchableOpacity
                                    onPress={props.onLike.bind(this, props.id)}>
                                    <AntDesign
                                        style={{ margin: -1, padding: -1 }}
                                        name={props.isLiked ? "heart" : "hearto"}
                                        size={30}
                                        color={props.isLiked ? '#ff4848' : '#A9A9A9'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </GestureRecognizer>
    );
};

export default RecipeModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 30,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 20,
        shadowColor: 'black',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    textContainer: {
        padding: 20,
    },
    title: {
        marginBottom: 10,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000000',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    description: {
        fontSize: 16,
        color: '#A9A9A9',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    button: {
        width: '35%',
        height: 40,
        backgroundColor: '#4aa15d',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    likeContainer: {
        marginRight: 10,
    }
});

