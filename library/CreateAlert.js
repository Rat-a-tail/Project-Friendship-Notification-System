import React, { Component, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

export default function CreateAlert ({route, navigation }) {
	const { user } = route.params;
	const [ receiver, setReceiver ] = useState(' ');
	const [subject, setSubject ] = useState('Missing Child');
	const [ contents, setContents] = useState(' ');
	const [url, SetUrl] = useState('http://10.42.248.168:3001');
	const [formContentType, setFormContentType ] = useState('application/x-www-form-urlencoded;charset=UTF-8');
	
		
	handlePress = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        console.log(params);
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
	        {/*</View> */}

			{/* To */}

			<Text>To:</Text>
	        {/*<View style={styles.input}>*/}
	        <TextInput
	          style={styles.input}
	          placeholder="Parent/Mentor"
	          onChangeText={(receiver) => setReceiver({receiver})}
	          value={receiver}
	        />
	         {/*</View> */}

			{/* Subject*/}

			<Text>Subject:</Text>
	        {/*<View style={styles.input}>*/}
	        <TextInput
	          style={styles.input}
	          placeholder="Hi"
	          onChangeText={(subject) => setSubject({subject})}
	          value={subject}
	        />
	         {/*</View> */}

			{/* Content*/}

			<Text>Content:</Text>
	        {/*<View style={styles.input}>*/}
	        <TextInput
	          style={styles.input}
	          placeholder="PF"
	          onChangeText={(contents) => setContents({contents})}
	          value={contents}
	        />
	         {/*</View> */}
                <Button color = 'green' title = 'send'
                onPress = {() => handlePress('inserted', 'POST', {
                	headers: {
                		'Content-type': formContentType,
                		//'subject': subject.subject,
                		//'sender': user.email,
                		//'contents': contents.contents,
                		//'receiver': receiver.receiver
                	},
                	body: JSON.stringify({
                		subject: subject.subject,
                		sender: user.email,
                		contents: contents.contents,
                		receiver: receiver.receiver}),
                	//body:
                		//`subject=${subject.subject} sender = ${sender.sender} contents = ${contents.contents} receiver = ${receiver.receiver}`
                		//subject: subject.subject,
                		//'sender': sender.sender,
                		//'contents': contents.contents,
                		//'receiver': receiver.receiver
                	})
                	}
                	/>
                		
                
                
            <Button color='tomato' title = 'Inbox'
	        onPress = {() => {navigation.navigate("Inbox", {user})}} />

                
            </View>
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
    input: {
    	textAlign: 'center',
    	width: '75%',
   	 	margin: 12,
    	borderWidth: 1,
    	padding: 10,
    	}
    });
