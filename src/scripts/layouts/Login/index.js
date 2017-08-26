// @flow

import * as React from 'react';
import Login from '../../features/Login';

const LoginLayout = () => {
    return (
        <section>
            <header>
                login header
            </header>

            <main className="container">
                <Login />
            </main>

        </section>
    );
};

export default LoginLayout;
