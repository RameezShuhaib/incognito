import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native'


export class Firestore{
    init(token){
        console.log(token);
        this.db = firebase.firestore();
        return firebase.auth().signInWithCustomToken(token).then(u=>{
            this.me = u.uid;
            console.log(this.me+' connected...');
        }).catch(function(error) {
            console.log(error);
        });
    }

    getChats(){
        return this.db.collection("app").doc("users").collection(this.me)
        .doc("chat").collection("chats")
    }

    sendMessage(c_id, message){
        return this.db.collection("app").doc("conversations").collection("chats")
        .doc(c_id).collection("messages").add(message)
    }

    getMessages(c_id){
        return this.db.collection("app").doc("conversations").collection("chats")
        .doc(c_id).collection("messages")
    }

    setSent(c_id, m_id){
        return this.db.collection("app").doc("conversations").collection("chats")
        .doc(c_id).collection("messages").doc(m_id).update({'sent':true})
    }

    setReceived(c_id, m_id){
        return this.db.collection("app").doc("conversations").collection("chats")
        .doc(c_id).collection("messages").doc(m_id).update({'received':true})
    }

    setSeen(c_id, m_id, me){
        let temp = {}
        temp[me] = true
        return this.db.collection("app").doc("conversations").collection("chats")
        .doc(c_id).collection("messages").doc(m_id).update(temp)
    }

    getTimestamp(){
        return firebase.firestore.FieldValue.serverTimestamp()
    }

    async createMessage(me, you, visible){
        let c_id = ''
        await this.db.collection("app").doc("conversations")
        .collection("chats").add({}).then(data=>{
            c_id = data.id;
            this.db.collection("app").doc("users")
            .collection(me).doc("chat").collection("chats").add({
                "c_id": c_id,
                "name": you,
                "seen": true,
                "me": "1",
            });
            let chat = {}
            if(visible)
                chat = {"c_id": c_id, "seen": false, "name": me, "me": "2"}
            else
                chat = {"c_id": c_id, "seen": false, "me": "2"}
            this.db.collection("app").doc("users")
            .collection(you).doc("chat").collection("chats").add(chat);
        })
        return c_id
    }
}

export default new Firestore;
