import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class Login extends Component {
    render() {
	    return (
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.titleText}>
                    <Text>Create an alert</Text>
                </Text>

                <View style={{padding: 250}}/> 
                {/* Space between title and buttons*/}
                
                <View style={styles.buttonStyle}> 
                    <Button title="Back "
                            onPress={() => this.props.navigation.navigate('Login')}/>
                </View> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        width: 300, // space between buttons
        height: 60,
        
      },
    titleText: {
        fontFamily: 'sans-serif-light',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 30,
    },
    });