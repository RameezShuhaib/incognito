export class chats {}
export class messages {}

messages.schema = {
    name: 'Messages',
    primaryKey: 'm_id',
    properties: {
        text: 'string',
        timestamp: 'string',
        m_id: 'string'
    }
}

chats.schema = {
    name: 'Chats',
    primaryKey: 's_id',
    properties: {
        s_id: 'string',
        c_id: 'string',
        name: {type:'string', default: 'Anonymous'},
        messages: 'Messages[]'
    }
}

