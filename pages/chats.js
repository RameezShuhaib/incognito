import React, { Component } from 'react';
import {
   View,
   ListView,
   Image,
   Text,
   TouchableOpacity,
   StyleSheet,
   Dimensions,
   ScrollView,
   Modal
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import EIcon from 'react-native-vector-icons/Entypo'
import Data from '../data/data';
import Header from '../components/header'
import firestore from '../firebase';


const { height, width } = Dimensions.get("window");

export default class Chats extends Component {
  
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title:'Chats',
      headerLeft: null,
      headerRight: 
        <TouchableOpacity
        style={{marginRight:10}}
        onPress={() => params.showModal()}
        >
          <EIcon name="new-message" size={25}/>
        </TouchableOpacity>
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      Chats: [],
      modal: false
    };
    this.showModal = this.showModal.bind(this);
    // firestore.createMessage(firestore.me, 'Samanvitha', true).then(r=>{
    //   console.log(r)
    // })
  }
  
  componentDidMount(){
    this.props.navigation.setParams({ showModal: this.showModal })
    firestore.getChats().onSnapshot((snap, err)=>{
      let chats = []
      snap.forEach(ele=>{
        data = ele.data();
        let chat = {}
        chat.c_id = data.c_id;
        chat.me = data.me;
        if(data.name)
          chat['name'] = data.name
        else
          chat['name'] = 'Anonymous'
        chats.push(chat);
      })
      this.setState({Chats: chats})
    });
  }

  showModal(){
    this.setState({modal: true});
  }

  render() {
    return (
      // this.state.modal ? {backgroundColor: 'rgba(0,0,0,0.5)'} : ''
      <View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modal}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}
        >
          <View style={styles.modalcontainer}>
            <View style={styles.modaltop}>
              <TouchableOpacity 
              style={styles.modaltopbutton} 
              onPress={()=>{this.setState({modal: false});}}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <View style={styles.user_icon}>
                <FAIcon name="user-secret" size={25}/>
              </View>
              <View>
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>"Rameez"</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {/* <Header title="Chats"/> */}
        <ScrollView style={styles.scroll}>
        {
          this.state.Chats.map((item, index)=>{
          return (
            <TouchableOpacity key={index}
              onPress={() => {
                this.props.navigation.navigate('Messages', {'name': item.name, 'c_id': item.c_id,  'me': item.me})
              }}
            >
              <View style={styles.row}>
                <View style={styles.user_icon}>
                  <FAIcon name="user-secret" size={25}/>
                </View>
                {/* <Image source={item.image} style={styles.pic} /> */}
                <View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.name}</Text>
                    {/* <Text style={styles.time}>{item.time}</Text> */}
                  </View>
                  <View style={styles.msgContainer}>
                    <Icon
                      name={item.icon} size={15} color="#b3b3b3"
                      style={{ marginLeft: 15, marginRight: 5 }}
                    />
                    {/* <Text style={styles.msgTxt}>{item.message}</Text> */}
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
  header:{
    flexDirection: 'row',
    width:width,
    height: 65,
    borderBottomColor: "rgb(213, 213, 213)",
    borderBottomWidth: 0.5,
    justifyContent: 'center',
  },
  headerTitle:{
    top: 30,
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(55, 55, 55)",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f7f7f7',
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  scroll:{
    height: height-140,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
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
  user_icon: {
    backgroundColor: "#eff0f5",
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  time: {
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
  },
  modalcontainer:{
    // backgroundColor: 'rgb(233,233,238)',
    shadowColor: 'rgb(64, 64, 64)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'white',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 80,
    height: 400,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgb(207, 207, 208)',
    
  },
  modaltop: {
    height: 25,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(207, 207, 208)'
  },
  modaltopbutton: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop:5,
  }
});