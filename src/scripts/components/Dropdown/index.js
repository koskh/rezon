// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import styles from './index.pcss';


type Props = {
    title: string,
    className?: string
    // container: HTMLElement,
    // removeChild: Function
}

type State = {
    isShowedMenu: boolean,
    menuPosition: string
}

class Dropdown extends React.Component <Props, State> {
    props: Props;
    state = {
        isShowedMenu: false,
        menuPosition: ''
    };
    static defaultProps: Props = {
        title: 'Dropdown button',
        className: '',
    };

    dropDownMenu: ?HTMLElement = null;

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
        this.setState({ isShowedMenu: false, menuPosition: '' });
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
        const { title, className } = this.props;

        return (
            <div className="dropdown">
                <button className={cn('btn dropdown-toggle relative', className)} type="button" onClick={this.onOpenMenu}>

                    {title}

                    <div className={cn('dropdown-menu', { show: isShowedMenu }, styles[menuPosition])} ref={dropDownMenu => { this.dropDownMenu = dropDownMenu; }}>
                        <h6 className="dropdown-header">Dropdown header</h6>
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item disabled" href="#">Disabled action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">Separated link</a>
                    </div>

                </button>
            </div>
        );
    }
}

export default Dropdown;

