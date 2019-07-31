import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'


class MessageList extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            senderId:''
        }
    }


    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }
    
    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight   
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