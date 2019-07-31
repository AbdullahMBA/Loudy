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
      senderName: '',
      joinableRooms: [],
      joinedRooms: []
    }
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
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
        this.getRooms()

        console.log('Successful conncection', currentUser)
      })
      .catch(err => {
        console.log('Error connection ', err)
      })
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks: {
        onMessage: (message) => {
          this.setState({
            senderName: this.currentUser.id,
            messages: [...this.state.messages, message.parts[0].payload.content]
          })

        }
      }
    })
  }


  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        // do something with the rooms
        this.setState({
          joinableRooms,
          joinableRooms: this.currentUser.rooms
        })
      })
      .catch(err => {
        console.log(`Error getting joinable rooms: ${err}`)
      });
  }

  snedMessage() {
    this.currentUser.sendMessage()
  }


  render() {

    return (
      <div className="app">
        <RoomList 
        roomId={this.state.roomId}
        subscribeToRoomMultipart={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, [...this.state.joinedRooms]]}
          userinfo={this.currentUser}
          key={this.roomId} />
        <MessageList messages={this.state.messages} senderId={this.state.senderName} />
        <SendMessageForm userinfo={this.currentUser} roomId={this.state.roomId} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App