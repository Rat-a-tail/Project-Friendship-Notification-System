import React, { Component, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView, Image, Pressable } from 'react-native';
import Message from './InboxButtonsMessage.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Inbox ({ route, navigation }) {	
	const [sender, setSenders] = useState([]);
	const [contents, setContents] = useState([]);
	const [subjects, setSubjects] = useState([]);
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
            	var jsonObj = JSON.parse(responseText);
            	jsonObj = jsonObj[1];
            	let send = [];
            	let cont = [];
            	let subj = [];
            	jsonObj.map((item, index) => {
            		send[index] = item.sender;
            		cont[index] = item.contents;
            		subj[index] = item.subject;
            	});
            	setSenders(send);
            	setContents(cont);
            	setSubjects(subj);
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
	//get_messages(user.email);
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
	         	{
	         		
     			sender.map((item, index) => {
     				return <Message key = {index} subject = {subjects[index]} contents = {contents[index]} from = {item}/>
     			})}
			</ScrollView>
		</View>
		<View style = {styles.footer}>
		<View style={styles.buttonStyle}>
                    <Ionicons.Button name="mail" backgroundColor="#ba2318" onPress={() => navigation.navigate('Inbox', {user} )}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Inbox </Text>
                    </Ionicons.Button>
                    <Ionicons.Button name="add-circle" backgroundColor="#ba2318" onPress={() => navigation.navigate('Alert', {user})}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Alert </Text>
                    </Ionicons.Button>
                </View>
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
    },
    buttonStyle: {
        borderTopColor: '#ba2318',
        borderTopWidth: 1,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 80,
        borderRadius: 10,
        height: 60,
      },
    
    });
    
    
    
    
