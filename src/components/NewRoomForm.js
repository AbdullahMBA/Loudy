import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Input } from '@material-ui/core';




const classes = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

class NewRoomForm extends React.Component {
    constructor() {
        super()

        this.state = {
            open: false,
            roomName: '' ,
            private:false
        }
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onOpenModal = this.onOpenModal.bind(this)
        this.gettingRoomName = this.gettingRoomName.bind(this)
        this.handleEvent = this.handleEvent.bind(this)
    }

    onOpenModal() {
        this.setState({
            open: true
        })
    }

    onCloseModal = () => {
        this.setState({ open: false });


    };

    gettingRoomName(event) {
        this.setState({
            roomName: event.target.value
        })
        console.log(this.state.roomName)
    }




    handleEvent(e){
     e.preventDefault()   
    this.props.userinfo.createRoom({
        name: this.state.roomName,
        private: this.state.private
    }).then(setTimeout(() =>{
        window.location.reload()
    }, 50))

  
    }

    render() {
        const { open } = this.state;
        return (
            <div className="new-room-form">
                <form onSubmit={this.handleEvent}>
                <Button variant="outlined" size="Medium" className={classes.margin} onClick={this.onOpenModal}>
                    Create Room
                </Button>

                <Dialog open={open} onClose={this.onCloseModal} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Create a new room</DialogTitle>
                    <DialogContent>
                        <Input
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Room Name"
                            type="text"
                            fullWidth
                            ref="room"
                            value={this.state.roomNameing}
                            onChange={this.gettingRoomName}

                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleEvent} > Create</Button>
                    </DialogActions>

                </Dialog>
                </form>
            </div>
        )
    }
}

export default NewRoomForm