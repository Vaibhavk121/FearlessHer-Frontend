import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const Account = ({ username, token, onLogout, navigation }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await axios.get('http://192.168.70.207:5000/api/user-profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfileImage({ uri: response.data.profileImage });
            } catch (error) {
                console.error('Error fetching profile image:', error.message);
                Alert.alert('Error', 'Failed to fetch profile image.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileImage();
    }, [token]);

    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType.IMAGE,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage({ uri: result.assets[0].uri });
            await uploadProfileImage(result.assets[0].uri);
        }
    };

    const uploadProfileImage = async (uri) => {
        const formData = new FormData();
        formData.append('profileImage', {
            uri,
            name: 'profile.jpg',
            type: 'image/jpeg',
        });

        try {
            await axios.post('http://192.168.70.207:5000/api/upload-profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            Alert.alert('Success', 'Profile image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading profile image:', error);
            Alert.alert('Error', 'Failed to upload profile image.');
        }
    };

    const removeProfileImage = async () => {
        try {
            await axios.post('http://192.168.70.207:5000/api/remove-profile-image', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfileImage(null);
            Alert.alert('Success', 'Profile image removed successfully!');
        } catch (error) {
            console.error('Error removing profile image:', error);
            Alert.alert('Error', 'Failed to remove profile image.');
        }
    };

    const handleLogout = () => {
        onLogout();
        navigation.navigate('Login'); // Redirect to login page
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#6A5ACD" />
            ) : (
                <View style={styles.card}>
                    <Image
                        source={profileImage || require('./Images/account.png')}
                        style={styles.profileImage}
                    />
                    <Text style={styles.username}>{username}</Text>
                    <Button title="Upload Image" onPress={handleImagePick} />
                    {profileImage && <Button title="Remove Image" onPress={removeProfileImage} color="red" />}
                    <Button title="Logout" onPress={handleLogout} color="red" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    card: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
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
        marginBottom: 10,
    },
});

export default Account; 