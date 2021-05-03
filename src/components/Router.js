import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Customers from './Customers';
import Trainings from './Trainings';


function Navigation() {
return ( 
    <div>
        <h1>Personal trainer App</h1>
    <Router>
        <div>
            <Link to="/">Customers</Link>{' '}
            <Link to="./trainings">Trainings</Link>{' '}
        <Switch>
                <Route exact path="/" component={Customers} />
                <Route path="/trainings" component={Trainings} />
                <Route render={() => <h1>Page not found</h1>} />
        </Switch>
        </div>
    </Router>
    </div>
);
}
export default Navigation;