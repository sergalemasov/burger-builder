import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

interface NavigationItemProps {
    link: string;
    isActive?: boolean;
    children?: React.ReactNode;
}

const navigationItem: React.FC<NavigationItemProps> = props => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                exact
                to={props.link}
                activeClassName={classes.active}>
                {props.children}
            </NavLink>
        </li>
    );
}

export default navigationItem;