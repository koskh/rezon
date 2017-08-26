// @flow
import * as React from 'react';
// import Header from '../../components/page-header';
import LoginForm from '../../components/LoginForm';

export default class Home extends React.Component {
    componentWillMount() {
        document.title = 'Login · Страница логина';
    }

    render() {
        return (
            <article>
                <LoginForm />
                <div className="row">
                    <div className="col-6 text-right">
                        <a href="">Забыл пароль</a>
                    </div>
                    <div className="col-6 text-left">
                        <a href="">Регистрация</a>
                    </div>
                </div>
            </article>
        );
    }
}
