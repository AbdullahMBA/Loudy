import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from 'react-responsive-modal';
import color from '@material-ui/core/colors/lightGreen';






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
            open: false
        }
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onOpenModal = this.onOpenModal.bind(this)
    }

    onOpenModal() {
        this.setState({
            open: true
        })
    }

    onCloseModal = () => {
        this.setState({ open: false });


    };



    render() {
        const { open } = this.state;
        return (
            <div className="new-room-form">
                <Button variant="outlined" size="Medium" color="primary" className={classes.margin} onClick={this.onOpenModal}>
                    Create a new Room
                </Button>

                <Modal open={open} onClose={this.onCloseModal} center >
                    <h2>Simple centered modal</h2>
                </Modal>
            </div>
        )
    }
}

export default NewRoomForm