import React from 'react'
import Chatkit from '@pusher/chatkit'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import { thisExpression } from '@babel/types';

class SendMessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''

        }
        this.onPush = this.onPush.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }


    onPush = (e) => {
      this.setState({
          message: this.refs.input.value
      })

    }

    onSubmit = (e) => {
        e.preventDefault()

        this.props.userinfo.sendSimpleMessage({
            text: this.state.message,
            roomId: this.props.userinfo.rooms[0].id
          });
          this.state.message = ''
    }
    render() {
        return (
            <form className="send-message-form" onSubmit={this.onSubmit}>
                <input
                    placeholder="SendMessageForm"
                    type="text" ref='input' value={this.state.message}  onChange={this.onPush} />
 


            </form>


        )
    }
}

export default SendMessageForm