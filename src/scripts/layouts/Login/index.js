import React from 'react';

const LoginLayout = props => {
    return (
      <section>
        <header>
                login header
        </header>

        <main className="login-layout-content">
          <div className="container">
            { props.children }
          </div>
        </main>

        <footer>
            login footer
        </footer>

      </section>
    );
};

export default LoginLayout;
