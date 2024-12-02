import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Footer = ({ navigation }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image source={require('../Images/Home.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
                <Image source={require('../Images/explore.webp')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image source={require('../Images/account.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#fff',
        elevation: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    icon: {
        width: 30,
        height: 30,
    },
});

export default Footer; 