import React from 'react';

const DefaultLayout = props => {
    return (
      <section>
        <header>
                default header links
        </header>

        <main className="default-layout-content">
          <div className="container">
            { props.children }
          </div>
        </main>

        <footer>
                default footer
        </footer>

      </section>
    );
};

export default DefaultLayout;
