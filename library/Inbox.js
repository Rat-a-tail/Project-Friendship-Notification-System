import React, { Component, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Inbox ({ route }) {
	const { user } = route.params;
	console.log("INBOX:", user);
	return (
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.titleText}>
                    <Text>Inbox</Text>
                </Text>
                 <Text>Welcome {user.name}!</Text>
                
                <View style={{padding: 250}}/> 
                {/* Space between title and buttons*/}
                 
            </View>
        );
}

const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'sans-serif-light',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 30,
    },
    });
