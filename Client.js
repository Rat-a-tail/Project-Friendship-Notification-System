import React, { Component } from 'react';
import { Button, View, Text, TextInput} from 'react-native';


export default class ButtonClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://10.42.248.168:3001',
			
            formContentType: "application/x-www-form-urlencoded;charset=UTF-8", 
            sender: ' ',
			receiver: ' ',
			subject: ' ',
			contents: ' ',
			
	};
    }

    handlePress = (op, method = '', params = {}) => {
        if (method != '')
            params.method = method;
        fetch(this.state.url + '/'+op, params)
            .then((response) => response.text())
            .then((responseText) => {
                alert(`
    
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
	          placeholder="Parent/Mentor"
	          onChangeText={(sender) => this.setState({sender})}
	          value={this.state.sender}
	        />
	        </View>

			{/* To */}

			<Text>To:</Text>
	        <View style={{margin: 5, paddingLeft: 10,
	                    borderStyle: 'solid', borderWidth: 3, }}>
	        <TextInput
	          style={{height: 40}}
	          placeholder="Parent/Mentor"
	          onChangeText={(receiver) => this.setState({receiver})}
	          value={this.state.receiver}
	        />
	        </View>

			{/* Subject*/}

			<Text>Subject:</Text>
	        <View style={{margin: 5, paddingLeft: 10,
	                    borderStyle: 'solid', borderWidth: 3, }}>
	        <TextInput
	          style={{height: 40}}
	          placeholder="Hi"
	          onChangeText={(subject) => this.setState({subject})}
	          value={this.state.subject}
	        />
	        </View>

			{/* Content*/}

			<Text>Content:</Text>
	        <View style={{margin: 5, paddingLeft: 10,
	                    borderStyle: 'solid', borderWidth: 3, }}>
	        <TextInput
	          style={{height: 100}}
	          placeholder="PF"
	          onChangeText={(contents) => this.setState({contents})}
	          value={this.state.contents}
	        />
	        </View>

            {/* RETRIEVE firstid */}

			<Button
	        color='blue' title='RETRIEVE'
	        onPress={() => this.handlePress('found', 'GET')} />	
			
			{/* UPDATE - firstid */}
			<Button
	       color='green'  title='SEND'
	        onPress={(e) => this.handlePress('inserted', 'POST', {
	            headers: {
	         	"Content-type": this.state.formContentType
		  }, 	
		  body: `subject=${this.state.subject}` ,
		/*body: `from=${this.state.from}`*/
			  /*body: 'to=${this.state.to}',*/
			  /*body: 'content=${this.state.content}'*/
			  
			}	
				
				
 	        )}/>
			
 	    </View> 
      );
    }
}




