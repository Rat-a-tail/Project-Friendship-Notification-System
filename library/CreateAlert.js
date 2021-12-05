import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CreateAlert ({navigation }) {

	    return (
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.titleText}>
                    <Text>Create an alert</Text>
                </Text>

                
            </View>
        );
    }

const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'sans-serif-light',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 30,
    },
    });
