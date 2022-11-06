import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavbarMaterial.module.scss';
import classNames from 'classnames/bind';
import Logout from '../../../components/pages/Register/Logout';
import CreateAcc from '../../../components/pages/Register/CreateAcc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const NavbarMaterial = () => {
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
                                    to="/homematerial"
                                >
                                    Tồn kho
                                </NavLink>
                            </li>

                            <li className={cx('nav-item')}>
                                <NavLink
                                    className={cx('nav-link')}
                                    to="/addproductmaterial"
                                >
                                    Thêm sản phẩm vào kho
                                </NavLink>
                            </li>

                            <li class={cx('nav-item')}>
                                <NavLink
                                    className={cx('nav-link')}
                                    exact
                                    to="/detailallbillexportmaterial"
                                >
                                    Hóa đơn đã xuất
                                </NavLink>
                            </li>

                            <li class={cx('nav-item')}>
                                <NavLink
                                    className={cx('nav-link')}
                                    exact
                                    to="/customerincomematerial"
                                >
                                    Doanh thu theo khách hàng
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

export default NavbarMaterial;
