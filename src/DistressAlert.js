import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import NavBar from './components/NavBar';

const DistressAlertScreen = ({ token, username, navigation }) => {
    const [location, setLocation] = useState('Fetching location...');
    const [nearbyUsers, setNearbyUsers] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(`${currentLocation.coords.latitude},${currentLocation.coords.longitude}`);
            setCurrentLocation(currentLocation.coords);
        };

        getLocation();
    }, []);
    useFocusEffect(
        React.useCallback(() => {
            // Reset showMap to false when the screen is focused
            setShowMap(false);
        }, [])
    );

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const filterActiveUsers = (users, currentLocation) => {
        return users.filter(user => {
            const [lat, lon] = user.location.latitude.split(',').map(Number);
            const distance = calculateDistance(currentLocation.latitude, currentLocation.longitude, lat, lon);
            return distance <= 2; // Within 2 km
        });
    };

    const sendAlert = async () => {
        console.log('Sending alert...');
        try {
            const alertResponse = await fetch('http://192.168.70.207:5000/api/alerts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },//Phone num, Local auth...Nearbyusers---Userid.,location----currentnav
                body: JSON.stringify({ username, location }),
            });

            console.log('Response status:', alertResponse.status);

            if (!alertResponse.ok) {
                const error = await alertResponse.json();
                console.error('Error response:', error);
                Alert.alert('Error sending alert', error.message);
                return;
            }

            const alertData = await alertResponse.json();
            console.log('Alert data:', alertData);
            Alert.alert('Alert sent successfully', alertData.message);
            setNearbyUsers(alertData.nearbyUsers); // Set nearby users
            setShowMap(true); // Show the map
        } catch (error) {
            console.error('Fetch error:', error);
            Alert.alert('Error sending alert', 'Network error or server not reachable.');
        }
    };

    const handleSOSPress = async () => {
        await sendAlert();
    };

    return (
        <View style={styles.container}>
            <NavBar
                onNotificationPress={() => console.log('Notification pressed')}
                navigation={navigation}
            />
            <View style={styles.content1}>
                {showMap ? (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: currentLocation ? currentLocation.latitude : 0,
                            longitude: currentLocation ? currentLocation.longitude : 0,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                    >
                        {currentLocation && (
                            <Marker
                                coordinate={{
                                    latitude: currentLocation.latitude,
                                    longitude: currentLocation.longitude,
                                }}
                                title="You are here"
                                pinColor="blue"
                            />
                        )}
                        {nearbyUsers.map(user => (
                            <Marker
                                key={user.userId}
                                coordinate={{
                                    latitude: parseFloat(user.location.latitude.split(',')[0]),
                                    longitude: parseFloat(user.location.latitude.split(',')[1]),
                                }}
                                title={`User: ${user.userId}`}
                            />
                        ))}
                    </MapView>
                ) : (
                    <>
                        <View style={styles.heroContainer}>
                            <Text style={styles.heroText}>
                                <Text style={styles.emergencyText}>Are you in an emergency?{"\n"}</Text>
                                <Text style={styles.instructionText}>
                                    {"\n"}Press and hold the SOS button for 3 seconds to send a distress signal.{"\n"}
                                </Text>
                            </Text>
                            <Image source={require('../assets/Images/emergencyImage.png')} style={styles.emergencyImage} />
                        </View>
                        <View style={styles.content2}>
                        <TouchableOpacity
                            style={styles.sosButton}
                            onLongPress={handleSOSPress}
                            delayLongPress={2000}
                        >
                            <Text style={styles.sosButtonText}>SOS</Text>
                            <Text style={styles.sosButtonInstruction}>Press 3 seconds</Text>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.exploreButton}
                            onPress={() => navigation.navigate('Explore')}
                        >
                            <Text style={styles.exploreButtonText}>Explore FearlessHer</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
   
    map: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        top: 40,
        paddingHorizontal: 20,
    },
    appTitle: {
        marginLeft: 25,
        fontSize: 35,
        fontWeight: 'bold',
        color: '#674188',
    },
    icon: {
        width: 40,
        height: 40,
    },
    heroContainer: {
        // backgroundColor:"#000000",
        width: '100%',
        height: '10px',
        flex: 0,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 60,
        marginBottom: 100,
    },
    heroText: {
        alignSelf: 'stretch',
        width: '50%',
        textAlign: 'left',
    },
    emergencyText: {
        lineHeight: 28,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#313A51',
    },
    instructionText: {
        lineHeight: 24,
        fontSize: 16,
        color: '#313A51',
    },
    emergencyImage: {
        alignSelf: 'stretch',
    },
    sosButton: {
        backgroundColor: '#674188',
        borderRadius: 100,
        width: 160,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    sosButtonText: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
    sosButtonInstruction: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
    exploreButton: {
        backgroundColor: '#674188',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 30,
        marginBottom:200,
        alignItems: 'center',
    },
    exploreButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default DistressAlertScreen;