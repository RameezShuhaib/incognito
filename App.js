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
import RootNavigator from './navigations/rootnavigation'
import firebase from './firebase';
import RNSecureKeyStore from 'react-native-secure-key-store';

console.disableYellowBox = true;

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      new: true,
    }
  }
  
  componentDidMount(){
    RNSecureKeyStore.get('token').then(token=>{
      firebase.token = token
      RNSecureKeyStore.get('secret').then(secret=>{
        firebase.secret = secret
        firebase.init().then(res=>{
          this.setState({
            loading:false,
            new: false
          })
        },
        err=>{
          console.log(err);
          this.setState({
            loading:false
          })
        });
      },
      err=>{
        console.log(err);
        this.setState({
          loading:false
        })
      });
    },
    err=>{
      console.log(err);
      this.setState({
        loading:false
      })
    });
  }
  render() {
    return (
      this.state.loading? <Text>Loading...</Text> 
      :this.state.new? <StackNavigator/>: <RootNavigator/>
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
