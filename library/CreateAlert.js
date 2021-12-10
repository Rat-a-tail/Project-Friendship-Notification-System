import React, { Component, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CreateAlert ({route, navigation }) {
	const { user } = route.params;
	const [ receiver, setReceiver ] = useState('Ole');
	const [subject, setSubject ] = useState('Missing Child');
	const [ contents, setContents] = useState('');
	const [url, SetUrl] = useState('http://10.42.224.126:3001');
	const [formContentType, setFormContentType ] = useState('application/x-www-form-urlencoded;charset=UTF-8');
	
	//Data for dropdownmenu
	const [open, setOpen] = useState(false);
	let role = get_send(user.email);
	const [value, setValue] = useState(role);
	const [items, setItems] = useState([
		{label: 'St. Olaf College', value: 'Ole'},
		{label: 'Carleton College', value: 'Carl'},
		{label: 'Both Colleges', value: 'All'}
		]);
	
		
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
            
                    <Text style = {styles.header}>Send an alert</Text>
     

			{/* To */}

			<Text>To:</Text>
	        <DropDownPicker 
	        	style = {styles.dropdown}
	        	textStyle = {{textAlign: 'center'}}
	        	open = {open}
	        	value = {value}
	        	items = {items}
	        	setItems={setItems}
	        	setOpen={setOpen}
	        	setValue={setValue}
	        	onChangeValue = {(choice) => {setReceiver(choice);}}
	        	/>
	        
			{/* Subject*/}

			<Text>Subject:</Text>
	        <TextInput
	          style={styles.input}
	          onChangeText={(subject) => setSubject(subject)}
	          value={subject}
	        />
			{/* Content*/}

			<Text>Message:</Text>
	        <TextInput
	          style={styles.input}
	          onChangeText={(contents) => setContents(contents)}
	          value={contents}
	        />
                <Button color = 'green' title = 'send' style = {styles.buton}
                onPress = {() => handlePress('insert', 'POST', {
                	headers: {
                		'Content-type': formContentType,
                		//'subject': subject.subject,
                		//'sender': user.email,
                		//'contents': contents.contents,
                		//'receiver': receiver.receiver
                	},
                	body: `subject=${subject}&sender=${user.email}&contents=${contents}&receiver=${receiver}`
                		//subject: subject.subject,
                		//'sender': sender.sender,
                		//'contents': contents.contents,
                		//'receiver': receiver.receiver
                	})
                	}
                	/>
                		
                
                
            <Button color='tomato' title = 'Return to Inbox' style = {styles.button}
	        onPress = {() => {navigation.navigate("Inbox", {user})}} />

             
            </View>
        );
    }
    
// helper function to get default send
function get_send(email) {
	let role;
	if(email.includes(`@stolaf.edu`)) {
		role = `Ole`
	} else if (email.includes(`@carleton.edu`)) {
		role = `Carl`
	} else {
		role = `All`
	}
	return role;
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
    	width: '100%',
   	 	margin: 12,
    	borderWidth: 1,
    	padding: 10,
     	borderRadius: 7,
     	backgroundColor: 'white'
    },
    button: {
    	borderRadius: 7
    },
    header: {
    	fontSize: 25,
    	textDecorationLine: 'underline',
    	fontWeight: 'bold'
    },
    dropdown: {
    	borderRadius: 7,
    	width: '100%',
    	justifyContent: 'center',
    	textAlign: 'center'
    }
    });
