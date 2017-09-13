// @flow

import * as React from 'react';
// import ReactDOM from 'react-dom';

import cn from 'classnames';
import getPositionClasses from '../../utilities/dom/getPositionClasses';

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
        this.setState({ isShowedMenu: true }, this._setMenuPosition);
    };
    onCloseMenu = () => {
        this.setState({ isShowedMenu: false, menuPosition: '' });
    };

    _setMenuPosition() { // "разумное" расположение менюшки
        if (!this.dropDownMenu)
            return;

        const { verticalClass, horizontalClass } = getPositionClasses(this.dropDownMenu, 'dropdown--');

        this.setState({ menuPosition: cn(styles[verticalClass], styles[horizontalClass]) });
    }

    render(): React.Element<any> {
        const { isShowedMenu, menuPosition } = this.state;
        const { title, className } = this.props;

        return (
            <div className="dropdown">
                <button className={cn('btn dropdown-toggle relative', className)} type="button" onClick={this.onOpenMenu}>

                    {title}

                    <div className={cn('dropdown-menu', { show: isShowedMenu }, menuPosition)} ref={dropDownMenu => { this.dropDownMenu = dropDownMenu; }}>
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

