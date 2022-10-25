import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const Navbar = () => {
    return (
        // <nav className={cx('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-dark')}>
        //     <div id="navbarTogglerDemo01" className={cx('collapse', 'navbar-collapse')}>

        //         <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        //             <li className={cx('nav-item', 'active')}>
        //                 <li className={cx('nav-item', 'active')}>
        //                     <NavLink
        //                         className="nav-link bg-white"
        //                         exact
        //                         to="/home"
        //                     >
        //                         Tổn kho
        //                     </NavLink>
        //                 </li>
        //             </li>
        //             <li class={cx('nav-item')}>
        //                 <NavLink
        //                     className="nav-link bg-white"
        //                     exact
        //                     to="/detailallbillexport"
        //                 >
        //                     Hóa đơn đã xuất
        //                 </NavLink>
        //             </li>

        //             <li className={cx('nav-item')}>
        //                 <Link
        //                     className={cx('btn', 'btn-outline-light')}
        //                     to="/products/add"
        //                 >
        //                     Thêm sản phẩm vào kho
        //                 </Link>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>

        <nav className={cx('navbar', 'navbar-dark', 'bg-dark')}>
            <div className={cx('container')}>
                <nav
                    className={cx('navbar', 'navbar-expand-lg', 'navbar-light', )}
                >
                    <div
                        id="navbarTogglerDemo01"
                        className={cx('collapse', 'navbar-collapse')}
                    >
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className={cx('nav-item', 'active')}>
                                <li className={cx('nav-item')}>
                                    <NavLink
                                        className={cx('nav-link')}
                                        exact
                                        to="/home"
                                    >
                                        Tổn kho
                                    </NavLink>
                                </li>
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

                            <li className={cx('nav-item', 'nav-item-edit')}>
                                <Link
                                    className={cx('btn', 'btn-outline-light')}
                                    to="/products/add"
                                >
                                    Thêm sản phẩm vào kho
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </nav>
    );
};

export default Navbar;
