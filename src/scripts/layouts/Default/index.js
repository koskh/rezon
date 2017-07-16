import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router'

import Navigation from '../../components/Navigation';

import Home from '../../features/Home';
import FormSample from '../../features/FormValidationSample';
import NotFound from '../../features/NotFound';

const DefaultLayout = () => {
    return (
      <section>
        <header>
            <Route component={Navigation} />
        </header>

        <main className="container">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/form-sample" component={FormSample} />
            <Route component={NotFound} />
          </Switch>
        </main>

        <footer>
                default footer
        </footer>

      </section>
    );
};

export default DefaultLayout;
