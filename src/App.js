import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import PageError from './components/PageError';
import Range from './components/Range';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/exercise1" render={() => <Range type="normal" />} />
                <Route exact path="/exercise2" component={() => <Range type="fixed" />} />
                <Route component={PageError} />
            </Switch>
        </Router>
    );
};

export default App;
