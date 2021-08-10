import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Range from './components/Range';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/exercise1" render={() => <Range type="range" />} />
                <Route exact path="/exercise2" component={() => <Range type="values" />} />
            </Switch>
        </Router>
    );
};

export default App;
