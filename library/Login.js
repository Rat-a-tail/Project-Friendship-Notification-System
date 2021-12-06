import React from "react";
import { StyleSheet, View, Button, Text, Image } from "react-native";
import * as Google from "expo-google-app-auth";

export default function Login ({ navigation }) {
  const signInAsync = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: `537101146129-jeulpe3icm2i30sp1kp9m7fhmn1e8p8d.apps.googleusercontent.com`,
        androidClientId: `537101146129-776h84lg07qtg1v1hdaiupkk8e43ru2s.apps.googleusercontent.com`,
      });

      if (type === "success") {
        // Then you can use the Google REST API
        console.log("LoginScreen.js 17 | success, navigating to profile");
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
      

    	{/* <Text style = {styles.text}>PROJECT <Text style = {{color: "rgb(211,35,0)"}}>FRIENDSHIP</Text></Text>*/}
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
		fontFamily: "Roboto",
		color: "rgb(240, 140, 29)",
		fontSize: 35
	},
	button: {
	}
	});

