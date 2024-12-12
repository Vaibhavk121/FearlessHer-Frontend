import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const AccountSection = ({ username, onLogout, navigation }) => {
    return (
        <View style={styles.container}>
            <NavBar
                onNotificationPress={() => console.log('Notification pressed')}
                navigation={navigation}
            />
            
            <View style={styles.content}>
                <Text style={styles.title}>Account</Text>
                <Image
                    source={require('./Images/account.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.username}>{username}</Text>
                <Button title="Logout" onPress={onLogout} color="#674188" />
            </View>
            <Footer navigation={navigation} currentScreen="Account" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6A5ACD',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
});

export default AccountSection;
