// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import styles from './index.pcss';


type Props = {
    // container: HTMLElement,
    // removeChild: Function
}

type State = {
    isShowedMenu: boolean,
    menuPosition: string
}

class InternalServerError extends React.Component <Props, State> {
    state = {
        isShowedMenu: false,
        menuPosition: ''
    };

    dropDownMenu = null;

    componentWillMount() {
        window && window.addEventListener('resize', this.onCloseMenu);
        document.body && document.addEventListener('mousedown', this.onCloseMenu, true);
    }

    componentWillUnmount() {
        document.body && document.removeEventListener('mousedown', this.onCloseMenu, true);
    }

    onOpenMenu = () => {
        this.setState({ isShowedMenu: true }, this._calculateMenuPosition);
    };
    onCloseMenu = () => {
        this.setState((prev, props) => { return { isShowedMenu: false, menuPosition: '' }; });
    };

    _calculateMenuPosition() { // "разумное" расположение менюшки
        if (!this.dropDownMenu)
            return;

        const rect = this.dropDownMenu && this.dropDownMenu.getBoundingClientRect();

        let className = '';

        if ((rect.top + rect.height) > window.innerHeight) // меню не умещается в "нижн часть" окна
            className = 'dropdown-top';

        if ((rect.top - rect.height) < 0) // меню не умещается в "верхн часть окна", у "нижн"- приоритет
            className = 'dropdown-bottom';

        this.setState({ menuPosition: className });
    }

    render(): React.Element<any> {
        const { isShowedMenu, menuPosition } = this.state;
        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle relative" type="button" id="dropdownMenuButton" onClick={this.onOpenMenu} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button

                    <div className={cn('dropdown-menu', { show: isShowedMenu }, styles[menuPosition])} ref={dropDownMenu => { this.dropDownMenu = dropDownMenu; }}>
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        <div className="dropdown-divider"/>
                        <a className="dropdown-item" href="#">Separated link</a>
                    </div>

                </button>
            </div>
        );
    }
}

export default InternalServerError;

