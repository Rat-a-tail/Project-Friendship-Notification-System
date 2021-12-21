import React, { Component, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Google from "expo-google-app-auth";


export default function CreateAlert ({route, navigation }) {
	const { user } = route.params;
	const [ receiver, setReceiver ] = useState('Ole');
	const [subject, setSubject ] = useState('General Announcement');
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

    };
   /* 
    signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  }; */
    	
	    return (
	    <View style = {styles.screen}>
	    	<View style = {styles.header}>
            	<Text style = {styles.headerText}>Send an alert</Text>
            </View>
     
			<View style = {styles.mainBody}>

				{/* To */}

				<Text style = {styles.prompt}>To:</Text>
		{/*		<View style = {styles.dropdownView}>   */}
	        	<DropDownPicker 
	        		containerStyle = {{width: '90%', marginLeft: '5%', marginRight: '5%'}}
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
	        {/*	</View>     */}
		        
				{/* Subject*/}

				<Text style = {styles.prompt}>Subject:</Text>
		        <TextInput
		          style={styles.input}
		          onChangeText={(subject) => setSubject(subject)}
		          value={subject}
		        />
				{/* Message*/}
	
				<Text style = {styles.prompt}>Message:</Text>
		        <TextInput
		          style={styles.input}
		          onChangeText={(contents) => setContents(contents)}
		          value={contents}
		        />
                <Button color = 'green' title = 'send' style = {styles.button}
    	            onPress = {() => handlePress('insert', 'POST', {
    	            	headers: {
    	            		'Content-type': formContentType,
    	            	},
    	            	body: `subject=${subject}&sender=${user.email}&contents=${contents}&receiver=${receiver}`
    	            	})
    	            	}
               	/>
			</View>
                		
            <View style = {styles.footer}>
				<View style={styles.buttonStyle}>
                    <Ionicons.Button name="mail" backgroundColor="#ba2318" onPress={() => navigation.navigate('Inbox', {user} )}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Inbox </Text>
                    </Ionicons.Button>
                    <Ionicons.Button name="add-circle" backgroundColor="#ba2318" onPress={() => navigation.navigate('Alert', {user})}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Alert </Text>
                    </Ionicons.Button>
                  {/*  <Ionicons.Button name = "log-out" backgroundColor = "#ba2318" onPress={() => signOut()}>
                    	<Text style = {{color: 'white', fontWeight: 'bold'}}>Logout </Text>
                    </Ionicons.Button> */}
                </View>
			</View>
             
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
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 30,
    },
    input: {
    	textAlign: 'center',
    	width: '90%',
    	borderWidth: 1,
     	borderRadius: 7,
     	backgroundColor: 'white',
     	height: 50
    },
    button: {
    	borderRadius: 7,
    	width: '40%',
    	alignSelf: 'center',
    	margin: 50,
    	padding: 50,
    },
    header: {
    	fontSize: 25,
    	textDecorationLine: 'underline',
    	fontWeight: 'bold'
    },
    dropdown: {
    	borderRadius: 7,
    	justifyContent: 'center',
    	textAlign: 'center',
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
    	alignItems: 'center',
    	alignContent: 'center',
    	paddingTop: '5%',
    },
    headerText: {
    	fontSize: 50,
    	textAlign: 'center',
    	color: 'black'
    },
    dropdownView: {
    	alignSelf: 'center',
    	width: '90%',
    },
    prompt: {
    	fontSize: 20,
    },
    });
