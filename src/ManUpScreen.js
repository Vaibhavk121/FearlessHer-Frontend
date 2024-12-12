import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const ManUpScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <NavBar
                onNotificationPress={() => console.log('Notification pressed')}
                navigation={navigation}
            />
            <View style={styles.content}>
                <Text style={styles.title}>How Men Should Treat Women</Text>
                <Text style={styles.instruction}>
                    1. Respect their opinions and choices.
                </Text>
                <Text style={styles.instruction}>
                    2. Communicate openly and honestly.
                </Text>
                <Text style={styles.instruction}>
                    3. Support their goals and aspirations.
                </Text>
                <Text style={styles.instruction}>
                    4. Treat them as equals in all aspects of life.
                </Text>
                <Text style={styles.instruction}>
                    5. Always listen and be empathetic.
                </Text>
                <Text style={styles.instruction}>
                    6. Stand against any form of disrespect or violence.
                </Text>
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    instruction: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default ManUpScreen; 