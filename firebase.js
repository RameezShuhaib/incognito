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
                this.user = user
                console.log(this.user)
                this.profile_rf = this.storage_rf.child('profile/'+this.user.uid+'.jpg')
                resolve(user);
            },
            err=>{
                reject(err)
            })
        });
    }

    uploadPhoto(image){
        this.profile_rf.put(image.path, { contentType: image.mime })
        return this.getProfilePhoto()
    }

    getProfilePhoto(){
        return new Promise((resolve, reject)=>{
            this.profile_rf.getDownloadURL().then(url=>{
                this.profile_url = url
                resolve(url)
            },
            err=>{
                reject(err)
            });
        });
    }

    setupUser(country, phone){
        this.country = country
        this.phoneNumber = phone
        return this.db.collection("app").doc("users")
        .collection(this.user.uid).doc('details')
        .set({
            phoneNumber: this.phoneNumber, 
            country: this.country
        });
    }

    setName(name){
        this.name = name
        return this.db.collection("app").doc("users")
        .collection(this.user.uid).doc('details')
        .update({
            name: name
        });
    }

    authPhone(phoneNumber){
        return  new Promise((resolve, reject)=>{
            firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                this.confirmResult = confirmResult
                resolve(confirmResult)
            })
            .catch(error => reject(error));
        });
    }

    logout(){
        RNSecureKeyStore.remove("token").then(t=>{
            RNSecureKeyStore.remove("secret")
        })
    }

    confirmPhone(codeInput){
        this.credential = firebase.auth.PhoneAuthProvider.credential(this.confirmResult.verificationId, codeInput)
        return new Promise((resolve, reject)=>{
            firebase.auth().signInWithCredential(this.credential)
            .then(user=>{
                RNSecureKeyStore.set("token", this.confirmResult.verificationId).then(t=>{
                    RNSecureKeyStore.set("secret", codeInput).then(s=>{
                        this.user = user;
                        console.log(this.user)
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
        return this.db.collection("app").doc("users").collection(this.user.uid)
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
