import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import EditDream from './EditDream';
import Dreams from './Dreams';
import AddDream from './AddDream';
import DataBreakdown from './DataBreakdown';
import Nav from './Nav';

function Routes() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/dreams/:id" component={EditDream} />
                <Route path="/dreams" component={Dreams} />
                <Route path="/add-dream" component={AddDream} />
                <Route path="/data" component={DataBreakdown} />
            </Switch>
            {/* <div className="footer">Dreamly</div> */}
        </Router>
    );
}

export default Routes;
