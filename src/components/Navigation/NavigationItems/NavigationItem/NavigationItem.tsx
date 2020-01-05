import React from 'react';
import classes from './NavigationItem.module.css';

interface NavigationItemProps {
    link: string;
    isActive?: boolean;
    children?: React.ReactNode;
}

const navigationItem: React.FC<NavigationItemProps> = props => {
    const anchorClasses = props.isActive
        ? classes.active
        : '';

    return (
        <li className={classes.NavigationItem}>
            <a href={props.link} className={anchorClasses}>{props.children}</a>
        </li>
    );
}

export default navigationItem;