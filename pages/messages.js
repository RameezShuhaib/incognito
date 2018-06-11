import React, { Component } from 'react';
import {  View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GiftedChat } from "react-native-gifted-chat";

const { width, height } = Dimensions.get("window");

class MessageView extends Component {
  render() {
    const {text, right} = this.props;
    return right?
    
    <View style={messageStyles.right}>
      <Text>{text}</Text>
    </View>
    :
    <View style={messageStyles.left}>
      <Text>{text}</Text>
    </View>
  }
}

export default class Messages extends Component {
  static navigationOptions = {
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  onSend(){
    // const { id, senderId, text, createdAt } = data;
    id = '1';
    senderId = '2';
    text = "hi wassup??"
    createdAt = "01/14/1996"
    const incomingMessagee = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
      }
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessagee)
    }));

    id = '2';
    senderId = '2';
    text = "hi wassup??"
    createdAt = "01/14/1996"
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
      }
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  }
  
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        // user={{
        //   _id: CHATKIT_USER_NAME
        // }}
      />
      // <View style={styles.container}>
      //   <MessageView text="this is a test message"/>
      //   <View style={styles.msgbar}>
      //     <TextInput style={styles.type}
      //     placeholder="Type a Message"
      //     />
      //     <View style={styles.send}>
      //       <Icon name="md-send" color='white' size={20}/>
      //     </View>
      //   </View>
      // </View>
    );
  }
}

const messageStyles = StyleSheet.create({
  right:{
    margin: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'column',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  left:{
    margin: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'column',
    backgroundColor: 'rgb(117, 232, 125)',
    borderRadius: 10,
  }
});

const styles = StyleSheet.create({
  container:{
    height: height,
    flexDirection: 'column',
  },
  msgbar:{
    backgroundColor: 'white',
    height: 60,
    width: width,
    top: height-100-60,
    position: 'absolute',
    flexDirection: 'row',
  },
  type:{
    borderColor: 'rgb(237, 239, 241)',
    borderWidth: 1,
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    width: width - 80,
    borderRadius: 10,
    paddingLeft: 20,
  },
  send: {
    marginTop: 10,
    marginLeft: 10,
    height:40,
    width:40,
    borderRadius: 40,
    backgroundColor: 'rgb(117, 232, 125)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
