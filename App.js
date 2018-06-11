import React, { Component } from 'react';
import {
  YellowBox,
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import StackNavigator from './navigations/stacknavigation'
import firestore from './firebase';
import RNSecureKeyStore from 'react-native-secure-key-store';

// let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsicHJlbWl1bUFjY291bnQiOnRydWV9LCJ1aWQiOiJ0ZXN0IiwiaWF0IjoxNTI4MzYyOTc1LCJleHAiOjE1MjgzNjY1NzUsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGsteGUxZTNAcHJpdmF0ZS05Y2Y2MS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXhlMWUzQHByaXZhdGUtOWNmNjEuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20ifQ.Fe4sNXQ2XCjwec-Q1cD5LdMrcpdzFFWH6-oPnUF4LFJw70WCVjUbrLOePLieI6d8voGMUeIdUL09khETY3YSzWpFG78EazVwHWGtPhyoSwQ9Y2qR2IaSP3Zt_xEdB1iNXif-5gN1oJ6xVg6PlZ51OpRGxbgo8rnD94c1d8GClPfGo7_pcDP3IoL0TtxwwZ5omHJqAmnjxHS_xLSIaXX65J5kZtxTHcW7VsUDTk10rjC-Kph77_LKSl2neqgfPQBc3g0peZQ64WCzJGXuP1cfwIZvN7GGP-xPh3mCOPQqBG3SbSIFtq6TbxfIXfwre7Gar68KF4CkCLK3ezIkbClZZw';
console.disableYellowBox = true;

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true
    }
    // fetch('http://localhost:3000/auth')
    // .then((res) => res.json()).then(auth=>{
    //   firestore.init(auth['token']).then(res=>{
    //     console.log(res);
    //     this.setState({
    //       loading:false
    //     })
    //   })
    // });
  }
  async componentDidMount(){
    await RNSecureKeyStore.get('token').then(token=>{
      firestore.token = token
    },
    err=>{
      console.log(err);
    });
    await RNSecureKeyStore.get('secret').then(secret=>{
      firestore.secret = secret
    },
    err=>{
      console.log(err);
    });

    firestore.init().then(res=>{
      this.setState({
        loading:false
      })
    });
  }
  render() {
    return (
      this.state.loading? <Text>Loading...</Text> : <StackNavigator />
      // <StackNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
