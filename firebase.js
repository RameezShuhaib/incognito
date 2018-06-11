import firebase from 'react-native-firebase';
import RNSecureKeyStore from 'react-native-secure-key-store';


export class Firestore{
    constructor(){
        this.storage_rf = firebase.storage().ref();;
        this.db = firebase.firestore();
    }

    init(){
        this.credential = firebase.auth.PhoneAuthProvider.credential(this.token, this.secret)
        return new Promise((resolve, reject)=>{
            firebase.auth().signInWithCredential(this.credential)
            .then(user=>{
                console.log(user)
                this.user = user
                resolve(user);
            },
            err=>{
                reject(err)
            })
        });
    }

    uploadPhoto(image){
        let upload_rf = this.storage_rf.child('profile/'+this.user.uid+'.jpg')
        return upload_rf.put(image.path, { contentType: image.mime })
    }

    authPhone(phoneNumber){
        this.phoneNumber = phoneNumber
        return  new Promise((resolve, reject)=>{
            firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                this.confirmResult = confirmResult
                resolve(confirmResult)
            })
            .catch(error => reject(error));
        });
    }

    confirmPhone(codeInput){
        this.credential = firebase.auth.PhoneAuthProvider.credential(this.token, this.secret)
        return new Promise((resolve, reject)=>{
            firebase.auth().signInWithCredential(this.credential)
            .then(user=>{
                RNSecureKeyStore.set("token", this.token).then(t=>{
                    RNSecureKeyStore.set("secret", this.secret).then(s=>{
                        this.user = user;
                        resolve(user);
                    })
                })
            },
            err=>{
                reject(err)
            })
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
