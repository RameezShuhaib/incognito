import openSocket from 'socket.io-client';
// import {chats, messages} from './schema'
// import Realm from 'realm';
export { AsyncStorage } from 'react-native'
export const socket = openSocket('http://localhost:3000');
export const me = "9900903553";


export default class Socket {
    constructor(){
        // this.realm = new Realm({schema: [messages, chats]})
    }
    subscribeChats(){
        socket.on("message", async m=>{
            console.log(m)
            AsyncStorage.get
            await m.forEach(async e => {
                
                // this.subscribeMessage(e.c_id);
                socket.emit('message-ack', {me:me, s_id:e.s_id});
            });
        });
        socket.emit("message", {me:me});
    }

    subscribeMessages(){
        // this.realm.objects('Chats').forEach(d=>{
        //     console.log(d);
        //     this.subscribeMessage(d.c_id)
        // });
    }

    subscribeMessage(c_id){
        socket.on(c_id, c=>{
            console.log(c)
            let data = []
            c.forEach(m=>{
                data.push(m.m_id);
            });
            socket.emit(c_id, data)
        });
        socket.emit('chat', {c_id:c_id, me:me});
    }
}