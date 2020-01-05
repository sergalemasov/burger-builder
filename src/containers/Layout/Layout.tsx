import React, {Fragment, Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from 'components/Navigation/Toolbar/Toolbar';
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer';

interface LayoutState {
    isSideDrawerOpened: boolean;
}

class Layout extends Component {
    state: LayoutState = {
        isSideDrawerOpened: false
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState: LayoutState) => ({
            isSideDrawerOpened: !prevState.isSideDrawerOpened
        }));
    }

    render() {
        return (
            <Fragment>
                <SideDrawer
                    isOpened={this.state.isSideDrawerOpened}
                    backdropClick={this.sideDrawerToggleHandler}/>
                <Toolbar menuClicked={this.sideDrawerToggleHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

export default Layout;