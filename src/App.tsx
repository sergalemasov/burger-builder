import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Layout from 'containers/Layout/Layout';
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder';
import Checkout from 'containers/Checkout/Checkout';
import Orders from 'containers/Orders/Orders';

const App: React.FC = () => {
    return (
        <div className="App">
            <Layout>
                <Switch>
                    <Route
                        exact
                        path='/'
                        component={BurgerBuilder}
                    />
                    <Route
                        path='/checkout'
                        component={Checkout}
                    />
                    <Route
                        path='/orders'
                        component={Orders}
                    />
                    <Redirect
                        from='*'
                        to='/'
                    />
                </Switch>
            </Layout>
        </div>
    );
}

export default App;
