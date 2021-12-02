import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
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
        console.log(user);
        navigation.navigate("Inbox", { user });
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    <View style={styles.container}>
    	<Text style = {styles.text}>Project <Text style = {{color: "rgb(211,35,0)"}}>Friendship</Text></Text>
      <Button style = {styles.button} title="Login with Google" onPress={signInAsync} />
    </View>
  );
};
const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		width: "100%",
		height: "100%",
		alignItems: "center"
	},
	text: {
		fontFamily: "Roboto",
		color: "rgb(240, 140, 29)",
		fontSize: 40
	},
	button: {
	}
	});
