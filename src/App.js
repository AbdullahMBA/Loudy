import React from 'react'
import Chatkit from '@pusher/chatkit'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

import MessageList from './components/MessagesList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import { thisExpression } from '@babel/types';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      senderName: ''
    }
  }

  componentDidMount() {
    const tokenProvider = new Chatkit.TokenProvider({
      url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/3a4542ab-84f5-4bdf-9530-2f24aab1f51f/token"
    });
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:3a4542ab-84f5-4bdf-9530-2f24aab1f51f',
      userId: 'Abdullah',
      tokenProvider: tokenProvider
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser


        this.currentUser.subscribeToRoomMultipart({
          roomId: "21673207",
          hooks: {
            onMessage: (message) => {
              console.log(currentUser.id, message.parts[0].payload.content, message.createdAt)
              this.setState({
                senderName: currentUser.id,
                messages: [...this.state.messages, message.parts[0].payload.content]
              })

            }
          }
        });


        console.log('Successful conncection', currentUser)
      })
      .catch(err => {
        console.log('Error connection ', err)
      })
  }
  snedMessage() {
    this.currentUser.sendMessage()
  }
  render() {

    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages} senderId={this.state.senderName} />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    );
  }
}

export default App