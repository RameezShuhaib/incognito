import React, { Component } from 'react';
import {  View, Text, StyleSheet, Dimensions, TextInput, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CountryCodes from '../data/CountryCodes';
const {height, width} = Dimensions.get("window");
import {Button, ThemeProvider} from 'react-native-ios-kit'
import ImagePicker from 'react-native-image-picker';

const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true
    }
};

export default class NewScreen extends Component {
    static navigationOptions ={
        title:'Get Started'
    }
    constructor(props) {
        super(props);
        this.state = {
          name: null,
          avatarSource: null,
        };
    }

    uploadPhoto(){
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled photo picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
      
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      
              this.setState({
                avatarSource: source
              });
            }
        });
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Icon name="user-plus" color="rgb(152, 153, 155)" size={150} />
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
                onPress={()=>{this.props.navigation.navigate('Root')}}
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
