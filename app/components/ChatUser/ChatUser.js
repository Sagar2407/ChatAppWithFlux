import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import ChatActions from '../../actions/ChatActions'

class ChatUser extends Component{
  constructor(){
    super()
    this.state={
      message:""
    }
    this._handleOnChange=this._handleOnChange.bind(this)
    this._handleOnClick=this._handleOnClick.bind(this)
  }
  render(){
    return(
      <div>
        {/*<input type="text" ref={i=>{this.mess=i;}}*/}
               {/*onChange={this._handleOnChange} />*/}
        <input type="text" value={this.state.message}
               onChange={this._handleOnChange} />
        <Button onClick={this._handleOnClick}>
          Submit Message
        </Button>
      </div>
    )
  }
  _handleOnChange(e){
    this.setState({message:e.target.value})
  }
  _handleOnClick(){
    ChatActions.insertMessage({
      userId:this.props.id, message:this.state.message
    })
    // this.mess.value=""
    this.setState({message:""})
  }
}

export default ChatUser;
