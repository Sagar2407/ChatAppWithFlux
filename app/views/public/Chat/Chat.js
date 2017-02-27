import React, {Component} from 'react';
import ChatUser from '../../../components/ChatUser'
import ChatStore from '../../../stores/ChatStore'

class Chat extends Component{
  constructor(){
    super()
    this.state={
      messages: []
    }
    this._handleChatStore=this._handleChatStore.bind(this);
  }
  componentWillMount(){
    ChatStore.listen(this._handleChatStore);
  }
  componentWillUnmount(){
    ChatStore.unlisten(this._handleChatStore);
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  render(){
    return(
      <div>
        <ChatUser id="1" />
        <ChatUser id="2" />
        {this.state.messages &&
          this.state.messages.map((message,idx)=>
            <li key={idx}>{message.message}</li>
          )
        }
      </div>
    )
  }

  _handleChatStore(state){
    this.setState({messages:state.messages})
  }
}

module.exports=Chat;
