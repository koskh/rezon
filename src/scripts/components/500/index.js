// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
// import cn from 'classnames';

// import styles from './index.pcss';

const Timeout = 5000;

type Props = {
    container: HTMLElement,
    removeChild: Function
}

class InternalServerError extends React.Component <Props, *> {

    componentWillMount() {
        setTimeout(() => this.onClose(), Timeout);
    };

    componentWillUnmount() {
        // если добавляется сам, расскоментироваь удаление добавленого узла
        // document.body && document.body.removeChild(this.props.container);
    };

    onClose = () => {
        ReactDOM.unmountComponentAtNode(this.props.container);
    };

    render(): React.Element<any> {
        return (
            <div className="modal fade show" style={{ display: 'block' }}>
                <div className="modal-dialog" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">500 Internal server error</h5>
                            <button type="button" className="close" onClick={this.onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Произошла внутренняя ошибка сервера. Попробуйте через несколько минут.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InternalServerError;

