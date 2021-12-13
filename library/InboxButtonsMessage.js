import React, { Component, useState } from 'react';
import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: 'Missing child', 
            contents: 'Help! A child went missing!!', 
            from: 'bob@stolaf.edu'
        };
    }
    /*
    handlePress = () => {
        fetch('https://www.stolaf.edu/people/rab/mca/hello.txt')
            .then((response) => response.text())
            .then((responseText) => {
                alert("Message: \n\n "  + responseText);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    */
    render() {
	    return (
            <View style={{ alignItems: 'center' }}>

                <Text style={styles.titleText}>
                    <Text>Inbox</Text>
                </Text>


                <View> 
                    <Pressable
                    onPress={() => Alert.alert( this.state.subject, 
                        this.state.contents + '\n\n\nFrom:  ' + this.state.from
                         
                    
                    )}>
                    <Text style={styles.pressableText}>{
                        " Subject:  "+ this.state.subject + 
                        "\n Contents:  " + this.state.contents + 
                        "\n From:  " + this.state.from}</Text>
                    </Pressable>

                </View>
                

                <View style={styles.buttonStyle}>
                    <Ionicons.Button name="log-in" backgroundColor="#ba2318" onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Login </Text>
                    </Ionicons.Button>
                    <Ionicons.Button name="mail" backgroundColor="#ba2318" onPress={() => this.props.navigation.navigate('Inbox')}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Inbox </Text>
                    </Ionicons.Button>
                    <Ionicons.Button name="add-circle" backgroundColor="#ba2318" onPress={() => this.props.navigation.navigate('Alert')}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Alert </Text>
                    </Ionicons.Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        borderTopColor: '#ba2318',
        borderTopWidth: 1,
        marginVertical: 520, //use flex later to display the bottom buttons correctly
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 80,
        borderRadius: 10,
        width: 500, // space between buttons
        height: 60,
      },

    titleText: {
        fontFamily: 'sans-serif-light',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 30,
    },
    
    pressableText: {
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        fontSize: 15,
        letterSpacing: 1,
        
    },
});
