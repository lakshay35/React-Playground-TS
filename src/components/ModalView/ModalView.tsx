import * as React from 'react';
import { History } from 'history';

import {
    withStyles, Theme, createStyles
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = (theme: Theme) => createStyles({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

interface State {
    open: boolean
}

interface Props {
    containerView: any;
    history: History<any>
}

class ModalView extends  React.Component<Props, State> {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <Modal open={this.state.open} onClose={this.handleClose}>
                {this.props.containerView}
            </Modal>
        )
    }
}

const ModalViewComponent = withStyles(styles)(ModalView);

export default ModalViewComponent;