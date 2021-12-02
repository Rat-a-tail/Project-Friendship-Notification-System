import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Inbox ({ route, navigation }) {
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
                
                <View style={styles.buttonStyle}> 
                    <Button title="Create alert"
                            onPress={() => navigation.navigate('Alert')}/>
                </View> 
            </View>
        );
}

const styles = StyleSheet.create({
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        width: 300, // space between buttons
        height: 60,
        
      },
    titleText: {
        fontFamily: 'sans-serif-light',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 30,
    },
    });
