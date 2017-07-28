// @flow
import React from 'react';
// import Header from '../../components/page-header';
import LoginForm from '../../components/LoginForm';

export default class Home extends React.Component {
    componentWillMount() {
        document.title = 'Login · Страница логина';
    }

    render() {
        return (
          <article>
            <h1>Логин</h1>
            <p>Аутентификация пользователя.</p>

            <LoginForm />

          </article>
        );
    }
}
