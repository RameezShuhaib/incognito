import React, { Component } from 'react';
import {
   View,
   ListView,
   Image,
   Text,
   TouchableOpacity,
   StyleSheet,
   ScrollView
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Header from '../components/header'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Data from '../data/data';
import  Contacts from 'react-native-contacts';

let ContactData = []

export default class Chats extends Component {
  constructor(props) {
    super(props);
    console.log(ContactData)
    this.state = {
      Contacts: []
    };
    Contacts.getAll((err, contacts) => {
      if (err) throw err;
      contacts.forEach(c=>{
        ContactData.push({
          name: c.givenName,
          number: c.phoneNumbers
        });
      });
    });
    this.setState({
      Contacts: ContactData,
    });
  }


  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Header title="Contacts"/>
        <ScrollView>
        {
          this.state.Contacts.map((item, index)=>{
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigate('Chats');
              }}
  
            >
              <View style={styles.row}>
                <Image source={require('../images/contact.png') } style={styles.pic} />
                <View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.name}</Text>
                    <Text style={styles.mblTxt}>{item.number[0]? item.number[0].label:''}</Text>
                  </View>
                  <View style={styles.msgContainer}>
                    <Text style={styles.msgTxt}>{item.number[0]? item.number[0].number:''}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

          );
        })
      }
      </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f7f7f7',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,

  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,

  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
    marginLeft: 15,
  },
});
