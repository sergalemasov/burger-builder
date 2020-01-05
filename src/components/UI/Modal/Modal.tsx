import React, {Fragment, Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

interface ModalProps {
    children?: React.ReactNode;
    isVisible?: boolean;
    backdropClicked: () => void
}

class Modal extends Component<ModalProps> {
    shouldComponentUpdate(nextProps: Readonly<ModalProps>): boolean {
        return nextProps.isVisible !== this.props.isVisible;
    }

    render() {
        const modalClasses = [classes.Modal];

        if (this.props.isVisible) {
            modalClasses.push(classes.Visible);
        }

        return (
            <Fragment>
                {this.props.isVisible ? <Backdrop clicked={this.props.backdropClicked} /> : null}
                <div className={modalClasses.join(' ')}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default Modal;
