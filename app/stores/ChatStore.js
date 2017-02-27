"use strict";

import alt from '../altInstance';

import ChatActions from '../actions/ChatActions';

class ChatStore{
  constructor() {
    this.messages = [];
    this.bindListeners({
      insertMessage: ChatActions.INSERT_MESSAGE

    })
  }

  insertMessage(payload){
    if(!payload.error){
      console.log(payload)
      this.messages.push({
        id:payload.data.chat.userId,
        message:payload.data.chat.message,
        time:payload.data.chat.time
      })
    }
  }

}
export default alt.createStore(ChatStore, 'ChatStore');
