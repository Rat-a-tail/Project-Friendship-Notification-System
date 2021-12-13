import React, { Component, useState } from 'react';
import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Message extends Component {
    constructor(props) {
        super(props);
    }
    render() {
	    return (

                <View> 
                    <Pressable
                    onPress={() => Alert.alert( this.props.subject, 
                        this.props.contents + '\n\n\nFrom:  ' + this.props.from
                         
                    
                    )}>
                    <Text style={styles.pressableText}>{
                        " Subject:  "+ this.props.subject + 
                        "\n Contents:  " + this.props.contents + 
                        "\n From:  " + this.props.from}</Text>
                    </Pressable>

                </View>
                
/*
                <View style={styles.buttonStyle}>
                    <Ionicons.Button name="mail" backgroundColor="#ba2318" onPress={() => this.props.navigation.navigate('Inbox')}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Inbox </Text>
                    </Ionicons.Button>
                    <Ionicons.Button name="add-circle" backgroundColor="#ba2318" onPress={() => this.props.navigation.navigate('Alert')}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Alert </Text>
                    </Ionicons.Button>
                </View>
                */
        /*    </View>*/
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
