'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10,
        elevation: 6,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    excerpt: {
        fontSize: 16,
        color: '#A9A9A9',
        marginTop: 5,
    },    
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems:  'space-between',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    readMoreButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#4aa15d',
        borderRadius: 10,
        marginLeft: 20,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    likeContainer: {
        marginRight: 20,
        marginBottom: 20
    },
});