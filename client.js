import React, { Component } from 'react';
import { Button, View, Text, TextInput} from 'react-native';

export default class ButtonClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://10.42.248.168:3001',
            formContentType: "application/x-www-form-urlencoded;charset=UTF-8", 
            name: 'waiting for input'
	};
    }

    handlePress = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        fetch(this.state.url + '/'+op, params)
            .then((response) => response.text())
            .then((responseText) => {
                alert(`
                    Sent:  op=${JSON.stringify(op)}\nparams+method=${
			JSON.stringify(params)}\n
                    Received:  ${responseText}`);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    render(){
        return(
            <View style={{paddingTop: 100, paddingLeft: 50 }}>
              <Text>Project Friendship Messages</Text>
              {/* Comment: The empty View below is for vertical spacing */}

			  <View style={{padding: 10}}/>
			  <Text>Inbox messages:</Text>
              <View style={{padding: 10}}/>
            
			{/* From */}
			<Text>From:</Text>
	        <View style={{margin: 5, paddingLeft: 10,
	                    borderStyle: 'solid', borderWidth: 3, }}>
	        <TextInput
	          style={{height: 40}}
	          placeholder="Name to add"
	          onChangeText={(name) => this.setState({name})}
	          value={this.state.name}
	        />
	        </View>

			{/* To */}

			<Text>To:</Text>
	        <View style={{margin: 5, paddingLeft: 10,
	                    borderStyle: 'solid', borderWidth: 3, }}>
	        <TextInput
	          style={{height: 40}}
	          placeholder="Name to add"
	          onChangeText={(name) => this.setState({name})}
	          value={this.state.name}
	        />
	        </View>

			{/* Subject*/}

			<Text>Subject:</Text>
	        <View style={{margin: 5, paddingLeft: 10,
	                    borderStyle: 'solid', borderWidth: 3, }}>
	        <TextInput
	          style={{height: 40}}
	          placeholder="Name to add"
	          onChangeText={(name) => this.setState({name})}
	          value={this.state.name}
	        />
	        </View>

			{/* Content*/}

			<Text>Content:</Text>
	        <View style={{margin: 5, paddingLeft: 10,
	                    borderStyle: 'solid', borderWidth: 3, }}>
	        <TextInput
	          style={{height: 40}}
	          placeholder="Name to add"
	          onChangeText={(name) => this.setState({name})}
	          value={this.state.name}
	        />
	        </View>

            {/* RETRIEVE firstid */}

	      <Button
	        color='blue' title='Click to see value of found'
	        onPress={() => this.handlePress('found', 'GET')} />

			 {/* UPDATE - firstid */}

			 <Button
	        color='green' title='Click to update content'
	        onPress={() => this.handlePress('content', 'PUT')} />

              <View style={{padding: 10}}/>
 

 	    </View> 
      );
    }
}

