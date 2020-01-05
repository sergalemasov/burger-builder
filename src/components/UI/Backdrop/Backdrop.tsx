import React from 'react';
import classes from './Backdrop.module.css';

interface BackdropProps {
    clicked: () => void
}

const backdrop: React.FC<BackdropProps> = props => (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
);

export default backdrop;
