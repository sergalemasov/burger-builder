import React, {Fragment, Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

interface ModalProps {
    children?: React.ReactNode;
    isVisible?: boolean;
    isOnTop?: boolean;
    backdropClicked: () => void;
}

class Modal extends Component<ModalProps> {
    shouldComponentUpdate(nextProps: Readonly<ModalProps>): boolean {
        return nextProps.isVisible !== this.props.isVisible || this.props.children !== nextProps.children;
    }

    render() {
        const modalClasses = [classes.Modal];

        if (this.props.isVisible) {
            modalClasses.push(classes.Visible);
        }

        return (
            <Fragment>
                {this.props.isVisible
                    ? <Backdrop
                        clicked={this.props.backdropClicked}
                        isOnTop={this.props.isOnTop}/>
                    : null}
                <div className={modalClasses.join(' ')} style={this.props.isOnTop ? {zIndex: 800} : undefined}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default Modal;
