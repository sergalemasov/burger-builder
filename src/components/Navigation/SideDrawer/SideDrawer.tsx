import React, {Fragment} from 'react';

import Logo from 'components/Logo/Logo';
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems';
import Backdrop from 'components/UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

interface SideDrawerProps {
    isOpened: boolean;
    backdropClick: () => void;
}

const sideDrawer: React.FC<SideDrawerProps> = props => {
    const sideDrawerClasses = [classes.SideDrawer];

    if (props.isOpened) {
        sideDrawerClasses.push(classes.Open);
    } else {
        sideDrawerClasses.push(classes.Close);
    }

    return (
        <Fragment>
            {props.isOpened ? <Backdrop clicked={props.backdropClick}/> : null}
            <div className={sideDrawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>

    );
}

export default sideDrawer;