import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import Logout from '../pages/Register/Logout';
import CreateAcc from '../pages/Register/CreateAcc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const Navbar = () => {
    return (
        <nav className={cx('navbar', 'navbar-dark', 'bg-dark')}>
            <div className={cx('container', 'container-custom')}>
                <nav
                    className={cx(
                        'navbar',
                        'navbar-expand-lg',
                        'navbar-light',
                        'nav-custom',
                    )}
                >
                    <div
                        id="navbarTogglerDemo01"
                        className={cx('collapse', 'navbar-collapse')}
                    >
                        <ul
                            className={cx(
                                'navbar-nav',
                                'mr-auto',
                                'mt-2',
                                'mt-lg-0',
                                'navbar-custom',
                            )}
                        >
                            <li className={cx('nav-item')}>
                                <NavLink
                                    className={cx('nav-link')}
                                    exact
                                    to="/home"
                                >
                                    Tồn kho
                                </NavLink>
                            </li>

                            <li className={cx('nav-item')}>
                                <NavLink
                                    className={cx('nav-link')}
                                    to="/products/add"
                                >
                                    Thêm sản phẩm vào kho
                                </NavLink>
                            </li>

                            <li class={cx('nav-item')}>
                                <NavLink
                                    className={cx('nav-link')}
                                    exact
                                    to="/detailallbillexport"
                                >
                                    Hóa đơn đã xuất
                                </NavLink>
                            </li>

                            <li class={cx('nav-item')}>
                                <NavLink
                                    className={cx('nav-link')}
                                    exact
                                    to="/customerincome"
                                >
                                    Doanh thu theo khách hàng
                                </NavLink>
                            </li>

                            <li class={cx('nav-item')}>
                                <NavLink
                                    className={cx('nav-link')}
                                    exact
                                    to="/statistical"
                                >
                                    Thống kê
                                </NavLink>
                            </li>

                            <li class={cx('nav-item')}>
                                <NavLink
                                    className={cx(
                                        'nav-link',
                                        'btn',
                                        'btn-primary',
                                    )}
                                    exact
                                    to="/createaccount"
                                    style={{ marginLeft: '200px' }}
                                >
                                    Tạo tài khoản
                                </NavLink>
                            </li>

                            <li className={cx('nav-item')}>
                                <Logout />
                            </li>

                            <li className={cx('nav-item')}>
                                <NavLink
                                    className={cx('nav-link')}
                                    exact
                                    to="/select"
                                >
                                    <FontAwesomeIcon
                                        className={cx('navbar-icon')}
                                        icon={faArrowRightToBracket}
                                    />
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </nav>
    );
};

export default Navbar;
