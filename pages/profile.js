import React, { Component } from 'react';
import {  
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ImageBackground, 
  Dimensions,
  SegmentedControlIOS,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Swipeable from 'react-native-swipeable';

const {height, width} = Dimensions.get("window");
const profile_pic = require("../images/preeti.jpg")

const rightButtons = [
  <View style={{backgroundColor:"#ff2d55", flex: 1, justifyContent:"center", paddingLeft: 18}}>
    <MaterialCommunityIcons name="delete" color="white" size={40}/>
  </View>
  ,
  <View style={{backgroundColor:"#58eaa1", flex: 1, justifyContent:"center", paddingLeft: 18}}>
    <Icon name="share" color="white"  size={40}/>
  </View>
]

const Data = [
  "What do you like about me?",
  "What should I know?",
  "Can I know my mistakes?",
];

export default class Profile extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Questions"
    };
  }
  displayDetails() {
    return(
      <View>
        <View style={styles.row}>
          <View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>Username</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>Preeti A</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>Mob</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>+91 9590656450</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>Country</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>India</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  displayQuestions() {
    return Data.map((item, key)=>{
      return(
        <Swipeable rightButtons={rightButtons} key={key}>
          <TouchableOpacity
            onPress={() => {
              console.log('hi')
            }}
          >
            <View style={styles.row}>
              <View style={styles.ques_icon}>
                <FIcon name="question" size={25}/>
              </View>
              <View>
                <View style={styles.msgContainer}>
                  <Text style={styles.msgTxt}>{item}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeable>
      );
    });
  }
  render() {
    return (
      <View>
        <ScrollView style={styles.container}>
          <ImageBackground 
          style={styles.up} 
          source={profile_pic}
          blurRadius={40}
          >
            <Icon name="new-message" size={25} style={styles.writeMessage} />
            <Image
            style={styles.profile_pic}
            source={profile_pic}/>
            <Text style={styles.nameheader}>Preeti A</Text>
            <SegmentedControlIOS
              style={styles.control}
              values={['Details', 'Questions']}
              // selectedIndex={this.state.selectedIndex}
              tintColor="white"
              onValueChange={(val) => {
                this.setState({
                  selectedTab: val
                })
              }}
            />
          </ImageBackground>
          <View style={styles.down}>
              {
                this.state.selectedTab == "Details"? this.displayDetails(): this.displayQuestions()
              }
          </View>
        </ScrollView>
        <View styles={styles.fab}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "column",
    height: height-48,
    width: width,
  },
  up:{
    // flex: 1,
    flexDirection: "column",
    backgroundColor: "yellow",
    alignItems: 'center'
  },
  down:{
    // flex:1,
    // backgroundColor:"pink"
  },
  nameheader:{
    marginBottom: 10,
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: "white",
  },
  profile_pic:{
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
    borderRadius: 100,
    width: 200,
    height: 200,
  },
  control:{
    width:200,
    marginBottom: 10
  },
  writeMessage:{
    marginTop: 30,
    marginRight: 30,
    color: "white",
    alignSelf:"flex-end"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f7f7f7',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,

  },
  ques_icon: {
    backgroundColor: "#eff0f5",
    justifyContent: "center",
    alignItems: 'center',
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
    fontWeight: '400',
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
    width:width-100
  },
  fab:{
    backgroundColor: "#edf0f5",
    width:80,
    height:80,
    borderRadius: 40,
  }
});