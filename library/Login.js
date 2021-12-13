import React, { useState} from "react";
import { StyleSheet, View, Button, Text, Image } from "react-native";
import * as Google from "expo-google-app-auth";

export default function Login ({ navigation }) {
	const [url, setUrl] = useState('http://10.42.224.126:3001');
  const signInAsync = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: `537101146129-jeulpe3icm2i30sp1kp9m7fhmn1e8p8d.apps.googleusercontent.com`,
        androidClientId: `537101146129-776h84lg07qtg1v1hdaiupkk8e43ru2s.apps.googleusercontent.com`,
      });

      if (type === "success") {
        // Then you can use the Google REST API
        console.log("LoginScreen.js 17 | success, navigating to profile");
        {/* Accounts is checked against database, and added if not present */}
        params = {
        	"method": "GET",
        	}
        fetch(`${url}/users?email=${user.email}`, params)
        .then((response) => response.text())
        .then((responseText) => {
        	console.log(`Received ${responseText}`);
        	})
        	.catch((error) => {
        		console.error(error);
        		});
        navigation.navigate("Inbox", { user });
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
      style={{width:250, height:280}}
      resizeMode="contain" //maintain aspect ratio
      source={require('./friendshiplogo.png')}/>
      <Button color = "rgb(96, 36, 190)" title="Login with Google" onPress={signInAsync} />
    </View>
  );
};
const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		width: "100%",
		height: "100%",
		alignItems: "center",
    
	},
	text: {
		//fontFamily: "Roboto",
		color: "rgb(240, 140, 29)",
		fontSize: 35
	},
	button: {
	}
	});

