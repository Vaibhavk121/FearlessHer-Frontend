import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const NotificationScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <NavBar
                onNotificationPress={() => console.log('Notification pressed')}
                navigation={navigation}
            />
            <View style={styles.content}>
                <Image
                    source={require('./Images/notificationIcon.png')}
                    style={styles.icon}
                />
                <Text style={styles.title}>Notifications</Text>
                <Text style={styles.message}>All the notifications of the app will be shown here.</Text>
            </View>
            <Footer navigation={navigation} />
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
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#6A5ACD',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
});

export default NotificationScreen; 