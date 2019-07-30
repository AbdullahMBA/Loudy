import React from 'react'
import './style.css'


class MessageList extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            senderId:''
        }
    }
   
    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    
                    return (
                        <div key={index} className="message">
                            <div className="message-username">{this.props.senderId}</div>
                            <div className="message-text">{message}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default MessageList