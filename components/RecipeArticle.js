import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RecipeModal from './RecipeModal';
import { LinearGradient } from 'expo-linear-gradient';


const RecipeArticle = (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View>
                <ImageBackground source={{ uri: props.imageURL }} style={styles.image}>
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.6)']}
                        style={{ height: '100%', width: '100%' }} />
                </ImageBackground>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text numberOfLines={3} style={styles.excerpt}>{`${props.description}...`}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.readMoreButton}
                    onPress={showModal}>
                    <Text style={styles.buttonText}>Read more</Text>
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
            <RecipeModal
                isVisible={isModalVisible}
                onClose={hideModal}
                onLike={props.onLike.bind(this, props.id)}
                title={props.title}
                ingredients={props.ingredients}
                description={props.description}
                imageURL={props.imageURL}
                isLiked={props.isLiked}
            />
        </View>
    );
};

export default RecipeArticle;

const styles = require('../recipeStyles')