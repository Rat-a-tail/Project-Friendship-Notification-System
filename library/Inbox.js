import React, { Component, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from 'react-native';

export default function Inbox ({ route, navigation }) {
	const { user } = route.params;
	const [ sender, setSender] = useState(' ' );
	const [ receiver, setReceiver ] = useState(' ');
	const [subject, setSubject ] = useState(' ');
	const [ contents, setContents] = useState(' ');
	const [url, SetUrl] = useState('http://10.42.248.168:3001');
	const [formContentType, setFormContentType ] = useState('application/x-www-form-urlencoded;charset=UTF-8');
	
	handlePress = (op, method = '', params = {}) => {
        if (method != '') {
            params.method = method;
            console.log(params);
            }
        fetch(url + '/'+op, params)
            .then((response) => response.text())
            .then((responseText) => {
               alert(`
    
                    Received:  ${responseText}`);
            })
            .catch((error) => {
                console.error(error);
            });

    }

	return (
	<ScrollView>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.titleText}>
                    <Text>Inbox</Text>
                </Text>
                 <Text>Welcome {user.name}!</Text>
               
     
                {/* Space between title and buttons*/}
                 
            <Button
	        color='blue' title='RETRIEVE'
	        onPress={() => handlePress('messages', 'GET', {
	        	headers: {
	        		'Content-type': formContentType,
	        		'email': user.email,
	        		},
	        //body: JSON.stringify({email:user.email})
})}
	         />	
	        
	        <Button color='tomato' title = 'Alert'
	        onPress = {() => {
	        navigation.navigate("Alert", { user })}} />
	        </View>
            </ScrollView>
        );
}

const styles = StyleSheet.create({
    titleText: {
        //fontFamily: 'sans-serif-light',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 30,
    },
    });
