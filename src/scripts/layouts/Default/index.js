// @flow

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../../components/Navigation';

import Home from '../../features/Home';
import FormSample from '../../features/FormValidationSample';
import NotFound from '../../features/NotFound';

import DumpRedux from '../../features/DumpRedux';
import Samples from '../../features/Samples';

const DefaultLayout = () => {
    return (
        <section>
            <header>
                <Route component={Navigation} />
            </header>

            <main className="container">
                <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/form-sample" component={FormSample} />
                    <Route path="/redux" component={DumpRedux} />
                    <Route path="/samples" component={Samples} />
                    <Route component={NotFound} />
                </Switch>
            </main>

        </section>
    );
};

export default DefaultLayout;
