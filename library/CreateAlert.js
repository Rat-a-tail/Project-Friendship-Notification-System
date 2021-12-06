import React, { Component, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

export default function CreateAlert ({route, navigation }) {
	const { user } = route.params;
	const [ sender, setSender] = useState(' ' );
	const [ receiver, setReceiver ] = useState(' ');
	const [subject, setSubject ] = useState(' ');
	const [ contents, setContents] = useState(' ');
	const [url, SetUrl] = useState('http://10.42.248.168:3001');
	const [formContentType, setFormContentType ] = useState('application/x-www-form-urlencoded;charset=UTF-8');
	
		
	handlePress = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
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
            <View style={{ alignItems: 'center', padding: 50}}>
            
                    <Text>Create an alert</Text>
                    
                  
                                    {/* From */}
			<Text>From:</Text>
	        <View style={{margin: 5, paddingLeft: 10,
	                    borderStyle: 'solid', borderWidth: 3, }}>
	        <TextInput
	          style={{height: 40}}
	          placeholder="Parent/Mentor"
	          onChangeText={(sender) => setSender({sender})}
	          value={sender}
	        />
	        </View>

			{/* To */}

			<Text>To:</Text>
	        <View style={{margin: 5, paddingLeft: 10,
	                    borderStyle: 'solid', borderWidth: 3, }}>
	        <TextInput
	          style={{height: 40}}
	          placeholder="Parent/Mentor"
	          onChangeText={(receiver) => setReceiver({receiver})}
	          value={receiver}
	        />
	        </View>

			{/* Subject*/}

			<Text>Subject:</Text>
	        <View style={{margin: 5, paddingLeft: 10,
	                    borderStyle: 'solid', borderWidth: 3, }}>
	        <TextInput
	          style={{height: 40}}
	          placeholder="Hi"
	          onChangeText={(subject) => setSubject({subject})}
	          value={subject}
	        />
	        </View>

			{/* Content*/}

			<Text>Content:</Text>
	        <View style={{margin: 5, paddingLeft: 10,
	                    borderStyle: 'solid', borderWidth: 3, }}>
	        <TextInput
	          style={{height: 100, width: 100}}
	          placeholder="PF"
	          onChangeText={(contents) => setContents({contents})}
	          value={contents}
	        />
	        </View>
                
            <Button color='tomato' title = 'Inbox'
	        onPress = {() => {navigation.navigate("Inbox", {user})}} />

                
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
