import React from 'react';
import classes from './Toolbar.module.css';
import Logo from 'components/Logo/Logo';
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from 'components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';

interface ToolbarProps {
    menuClicked: () => void
}

const toolbar: React.FC<ToolbarProps> = props => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.menuClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;