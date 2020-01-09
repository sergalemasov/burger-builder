import React from 'react';
import classes from './Backdrop.module.css';

interface BackdropProps {
    clicked: () => void;
    isOnTop?: boolean;
}

const backdrop: React.FC<BackdropProps> = props => (
    <div
        className={classes.Backdrop}
        onClick={props.clicked}
        style={props.isOnTop ? {zIndex: 700} : undefined}></div>
);

export default backdrop;
