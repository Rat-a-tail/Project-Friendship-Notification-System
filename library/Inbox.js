import React, { Component, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView, Image, Pressable } from 'react-native';

export default function Inbox ({ route, navigation }) {
	const { user } = route.params;
	const [url, SetUrl] = useState('http://10.42.224.126:3001');
	const [formContentType, setFormContentType ] = useState('application/x-www-form-urlencoded;charset=UTF-8');
	
	handlePress = (op, method = '', params = {}) => {
        if (method != '') {
            params.method = method;
            }
        fetch(url + '/'+op, params)
            .then((response) => response.text())
            .then((responseText) => {
            	var obj = JSON.parse(responseText);
            	alert(responseText);	
            })	
            .catch((error) => {
                console.error(error);
            });

    }

// helper function to send request for messages
	get_messages = (email) => {
		handlePress(`messages?email=${email}`, 'GET', {
	        headers: {
	        	'Content-type': formContentType,
			}
		})
	}
	return (
	<View style={styles.screen}>
		<View style = {styles.header}>
			<Text style = {styles.headerText}>Inbox</Text>
			<Pressable style = {styles.pressable} onPress = {() => {
			get_messages(user.email)}}>
			<Image style={{width: 50, height: 50}}
      			resizeMode="contain" //maintain aspect ratio
      			source={require('./reload-icon.png')}/>
			</Pressable>
		</View>
	
		<View style = {styles.mainBody}>
			<ScrollView>
	         	<Text> Messages: </Text>
	        	<Button color='tomato' title = 'Alert'
					onPress = {() => {
						navigation.navigate("Alert", { user })}} />
			</ScrollView>
		</View>
	</View>
        );
}

const styles = StyleSheet.create({
	screen: {
		flexDirection: 'column',
		flex: 1
	},
    header: {
    	backgroundColor: 'rgb(119, 215, 239)',
    	borderWidth: 1,
    	borderStyle: 'solid',
    	flex: 1,
    	justifyContent: 'flex-end',
    },
    mainBody: {
    	flex: 9,
    },
    headerText: {
    	fontSize: 50,
    	textAlign: 'center',
    	color: 'black'
    },
    pressable: {
    	position: 'absolute',
    	right: 0,
    	bottom: 0,
    }
    
    });
    
    
    
    
