import React, { Component, useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Platform  } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
	  shouldShowAlert: true,
	  shouldPlaySound: false,
	  shouldSetBadge: false,
	}),
  });

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
	//let role = get_send(user.email);
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();	

	useEffect(() => {
		registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
	
		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
		  setNotification(notification);
		});
	
		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
		  console.log(response);
		});
	
		return () => {
		  Notifications.removeNotificationSubscription(notificationListener.current);
		  Notifications.removeNotificationSubscription(responseListener.current);
		};
	  }, []);


	  async function sendPushNotification(expoPushToken) {
		const message = {
		  to: expoPushToken,
		  sound: 'default',
		  title: 'Original Title',
		  body: 'And here is the body!',
		  data: { someData: 'goes here' },
		};
	  
		await fetch('https://exp.host/--/api/v2/push/send', {
		  method: 'POST',
		  headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(message),
		});
	  }
	  
	  async function registerForPushNotificationsAsync() {
		let token;
		if (Constants.isDevice) {
		  const { status: existingStatus } = await Notifications.getPermissionsAsync();
		  let finalStatus = existingStatus;
		  if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		  }
		  if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		  }
		  token = (await Notifications.getExpoPushTokenAsync()).data;
		  console.log(token);
		} else {
		  alert('Must use physical device for Push Notifications');
		}
	  
		if (Platform.OS === 'android') {
		  Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		  });
		}
	  
		return token;
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
	        
		<Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
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
