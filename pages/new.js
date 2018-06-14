import React, { Component } from 'react';
import {  View, StyleSheet, Dimensions, TextInput, Picker, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CountryCodes from '../data/CountryCodes';
const {height, width} = Dimensions.get("window");
import {Button, ThemeProvider} from 'react-native-ios-kit'
import firebase from '../firebase'
export default class NewScreen extends Component {
    static navigationOptions ={
        title:'Create account'
    }
    constructor(props) {
        super(props);
        this.state = {
          pno: '', 
          country: 'India',
          code: '+91',
        };
        this.signup = this.signup.bind(this);
    }

    signup(){
        let phone = this.state.code+this.state.pno;
        firebase.authPhone(phone).then(confirmResult=>{
            this.props.navigation.navigate('Verify', {country: this.state.country, phone: phone})
        },
        err =>{
            console.log(err)
        });
        // this.props.navigation.navigate('Verify', {country: this.state.country, phone: this.state.pno})
    }

    render() {
        return (
        <ScrollView style={styles.container}>
            <View style={styles.top}>
                <Icon name="lock-reset" color="rgb(152, 153, 155)" size={150} />
            </View>
            <View style={styles.inputpnocont}>
                <TextInput
                textAlign={'center'}
                placeholder="code"
                style={styles.inputcode}
                editable={false}
                value={this.state.code}
                />
                <TextInput
                // textAlign={'center'}
                style={styles.inputpno}
                keyboardType='numeric'
                placeholder="Phone Number"
                onChangeText={(pno) => this.setState({pno})}
                value={this.state.pno}
                />
            </View>
            <TextInput
            // textAlign={'center'}
            style={styles.input}
            editable={false}
            placeholder="Select Your Country Below"
            onChangeText={(pno) => this.setState({pno})}
            value={this.state.country}
            />
            <Picker style={styles.picker} selectedValue = {this.state.country}
            onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue, code: CountryCodes[itemIndex].dial_code})}
            >
               {
                   CountryCodes.map((val ,key)=>{
                        return <Picker.Item key={key} label = {val.name} value = {val.name} />
                   })
               }
            </Picker>
            
            <ThemeProvider>
                <Button inline 
                style={styles.verify}
                onPress={this.signup}
                >
                Next
                </Button>
            </ThemeProvider>
        </ScrollView>
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
        // marginTop: 80,
        paddingTop: 50,
        width: width,
        height: 250,
        // backgroundColor: 'white',
        alignItems: 'center',
    },
    inputpnocont:{
        height: 50,
        flexDirection: 'row'
    },
    inputcode:{
        flex:1,
        height: 50,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor : 'rgb(220, 220, 220)',
        borderRightWidth: 1,
    },
    inputpno:{
        flex: 5,
        width: width-60,
        alignSelf: 'flex-end', 
        height: 50,
        backgroundColor: 'white',
        paddingLeft: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(220, 220, 220)',
    },
    input:{
        height: 50,
        backgroundColor: 'white',
        paddingLeft: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(220, 220, 220)',
    },
    verify:{
        alignItems: 'center',
        backgroundColor:'white',
        padding: 15,
        width:width,
        marginBottom: 40
    },
    picker:{
        backgroundColor: 'white',
        marginBottom: 25,
        marginTop: 10
    }
});
