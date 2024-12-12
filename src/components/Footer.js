import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const Footer = ({ navigation, currentScreen }) => {
    return (
        <View style={styles.footer}>
            <View style={styles.sectionContent}>
                <TouchableOpacity onPress={() => navigation.navigate('DistressAlert')}>
                    <Image
                        source={
                            currentScreen === 'DistressAlert'
                                ? require('../Images/homeIconPurple.png')
                                : require('../Images/homeIcon.png')
                        }
                        style={styles.sectionIcon}
                    />
                </TouchableOpacity>
                <Text style={[styles.sectionName, currentScreen === 'DistressAlert' && styles.selectedText]}>Home</Text>
            </View>
            <View style={styles.sectionContent}>
                <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
                    <Image
                        source={
                            currentScreen === 'Explore'
                                ? require('../Images/exploreIconPurple.png')
                                : require('../Images/exploreIcon.png')
                        }
                        style={styles.sectionIcon}
                    />
                </TouchableOpacity>
                <Text style={[styles.sectionName, currentScreen === 'Explore' && styles.selectedText]}>Explore</Text>
            </View>
            <View style={styles.sectionContent}>
                <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                    <Image
                        source={
                            currentScreen === 'Account'
                                ? require('../Images/profileIconPurple.png')
                                : require('../Images/profileIcon.png')
                        }
                        style={styles.sectionIcon}
                    />
                </TouchableOpacity>
                <Text style={[styles.sectionName, currentScreen === 'Account' && styles.selectedText]}>Profile</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 74,
        backgroundColor: '#F5F5FA',
        elevation: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    sectionContent: {
        width: 54,
        height: 72,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionName: {
        fontSize: 9,
        fontWeight: 'semibold',
        textAlign: 'center',
        marginTop: 6,
        color: '#000',
    },
    selectedText: {
        color: '#674188',
        fontWeight: 'bold',
    },
    sectionIcon: {
        width: 24,
        height: 24,
    },
});

export default Footer;