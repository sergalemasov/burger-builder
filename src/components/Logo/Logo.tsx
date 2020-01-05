import React from 'react';
import burgerLogo from 'assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo: React.FC = () => (
    <div className={classes.Logo}>
        <img
            src={burgerLogo}
            alt="burger logo"
            className={classes.Image}
        />
    </div>
);

export default logo;