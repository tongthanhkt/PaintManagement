import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Logout.module.scss';

import classNames from 'classnames/bind';
const cx = classNames.bind(styles);



function Logout() {
    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        
    }

    return (
        <NavLink
            className={cx('nav-link', 'btn', 'btn-danger')}
            exact
            to="/"
            onClick={handleLogout}
        >
            Đăng xuất
        </NavLink>
    );
}

export default Logout;
