import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import firestore from '../firebase';
import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      lastvisible: null,
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };
    this.props.navigation.state.params.c_id
    this.c_id = this.props.navigation.state.params.c_id
    this.me = this.props.navigation.state.params.me
    this.you = this.me == "1"? "2":"1"
    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.subscribeMessage = this.subscribeMessage.bind(this);
  }

  componentWillMount() {
    this._isMounted = true;
    firestore.getMessages(this.c_id)
    .orderBy("timestamp", "desc").limit(10).get()
    .then(this.getData.bind(this, "next"))
    .then(this.subscribeMessage)
  }

  getData(state, snap){
    let msg = []
    this.state.lastvisible = snap.docs[snap.docs.length-1]
    // if(state == 'load')
    //   snap.pop()
    snap.forEach(ele=>{
        data = ele.data()
        data._id = ele.id
        firestore.setSeen(this.c_id, data._id, this.me).then(res=>{
          data.sent = true
        })
        msg.push(data);
    })
    this.setState((previousState) => {
      return {
        messages: state == "next"? 
        GiftedChat.append(previousState.messages, msg) : GiftedChat.prepend(previousState.messages, msg),
        isLoadingEarlier: false
      };
    });
  }

  subscribeMessage() {
    firestore.getMessages(this.c_id).where(this.me, "==", false).onSnapshot(snap=>{
      let snap_msg = []
      snap.forEach(ele=>{
          data = ele.data()
          data._id = ele.id;
          firestore.setSeen(this.c_id, data._id, this.me)
          if (data.user._id == this.me){
            data.sent = true
            firestore.setSent(this.c_id, data._id).then(this.updateMessage.bind(this, data))
          }
          else{
            data.received = true
            firestore.setReceived(this.c_id, data._id).then(this.updateMessage.bind(this, data))
          }
      })
    })
  }

  updateMessage(msg){
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, msg)
      };
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });
    firestore.getMessages(this.c_id)
    .orderBy("timestamp", "desc").startAfter(this.state.lastvisible).limit(10).get()
    .then(this.getData.bind(this, "load"))
  }

  onSend(messages = []) {
    msg = messages[0]
    msg.sent = true
    msg.timestamp = firestore.getTimestamp()
    msg[this.me] = false
    msg[this.you] = false
    
    firestore.sendMessage(this.c_id, msg);
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        user={{
          _id: this.me,
        }}
        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderSystemMessage={this.renderSystemMessage}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
