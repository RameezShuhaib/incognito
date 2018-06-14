import React, { Component } from 'react';
import {  View, Text, StyleSheet, Dimensions, TextInput, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const {height, width} = Dimensions.get("window");
import {Button, ThemeProvider} from 'react-native-ios-kit'
import ImagePicker from 'react-native-image-crop-picker';
import firebase from '../firebase'


export default class NewScreen extends Component {
    static navigationOptions ={
        title:'Get Started'
    }
    constructor(props) {
        super(props);
        this.state = {
          name: null,
          profile_pic: null,
          progress: false,
        };

    }

    uploadPhoto(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })
        .then(image => {
            console.log(image)
            this.setState({progress: true})
            firebase.uploadPhoto(image).then(url=>{
                this.setState({progress: false})
                this.setState({profile_pic: url})
            },
            err=>{
                console.log(err);
            });
        });
    }

    setup(){
        firebase.setName(this.state.name).then(res=>{
            this.props.navigation.navigate('Root')
        })
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.top}>
                {
                    this.state.profile_pic || this.state.progress?
                        this.state.profile_pic? <Image source={{uri: this.state.profile_pic, width: 150, height: 150}}/>
                        : <ActivityIndicator size="large" color="black" />
                    : <Icon name="user-plus" color="rgb(152, 153, 155)" size={150} />
                }
            </View>
            <TextInput
            textAlign={'center'}
            style={styles.input}
            placeholder="Enter your username"
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            />
            <View style={styles.upload}>
                <ThemeProvider>
                    <Button inline 
                    style={styles.save}
                    onPress={()=>{this.uploadPhoto()}}
                    >
                    Upload Photo
                    </Button>
                </ThemeProvider>
            </View>
            <ThemeProvider>
                <Button inline 
                style={styles.save}
                onPress={this.setup}
                >
                Get Started!
                </Button>
            </ThemeProvider>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
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
    input:{
        height: 50,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(220, 220, 220)',
    },
    save:{
        alignItems: 'center',
        backgroundColor:'white',
        padding: 15,
        width:width,
        borderBottomWidth: 1,
        borderColor : 'rgb(220, 220, 220)'
    },
    upload:{
        marginTop: 40,
        marginBottom: 40,
    },
});
