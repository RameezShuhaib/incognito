import React, { Component } from 'react';
import {  View, Text, StyleSheet, Dimensions, TextInput, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import firebase from '../firebase'

const {height, width} = Dimensions.get("window");
import {Button, ThemeProvider} from 'react-native-ios-kit'
export default class NewScreen extends Component {
    static navigationOptions ={
        title:'Verify',
        headerLeft: null
    }
    constructor(props) {
        super(props);
        this.state = {
          a: null,
          b: null,
          c: null,
          d: null,
        };
        this.verify = this.verify.bind(this)
    }
    verify(){
        firebase.confirmPhone('12345').then(user=>{
            this.props.navigation.navigate('ProfileSetup', user)
        },
        err=>{
            console.log(err)
        });
    }
    render() {
        return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Icon style={{marginBottom:20}} name="unlock" color="rgb(152, 153, 155)" size={150} />
                <Text>Enter your 4 digit pin sent to your phone.</Text>
            </View>
            <View style={styles.otp}>
                <TextInput
                textAlign={'center'}
                style={styles.box}
                maxLength={1}
                value={this.state.a}
                />
                <TextInput
                textAlign={'center'}
                style={styles.box}
                maxLength={1}
                value={this.state.b}
                />
                <TextInput
                textAlign={'center'}
                style={styles.box}
                maxLength={1}
                value={this.state.c}
                />
                <TextInput
                textAlign={'center'}
                style={styles.box}
                maxLength={1}
                value={this.state.d}
                />
            </View>
            <ThemeProvider>
                <Button inline style={styles.verify}
                onPress={this.verify}
                >
                Verify
                </Button>
            </ThemeProvider>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        // backgroundColor: 'white',
        flexDirection: 'column',
        width: width,
        height: height
    },
    top:{
        paddingTop: 50,
        width: width,
        height: 250,
        alignItems: 'center',
    },
    otp:{
        margin: 20,
        marginBottom: 50,
        height: 60,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    box:{
        margin: 5,
        backgroundColor: 'white',
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    verify:{
        alignItems: 'center',
        backgroundColor:'white',
        padding: 15,
        width:width,
        borderBottomWidth: 1,
        borderColor : 'rgb(220, 220, 220)'
    },
    picker:{
        backgroundColor: 'white',
        marginBottom: 25,
        marginTop: 10
    }
});
