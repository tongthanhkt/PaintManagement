import './index.css';
import React from 'react';
import styles from '../../pages/AllBillExport/AllBillExport.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Header() {
    return (
        <thead className={cx('thead-dark')}>
            <tr>
                <th className={cx('table-custom index')} scope="col">
                    Số thứ tự
                </th>
                <th className={cx('table-custom name')} scope="col">
                    Tên khách hàng
                </th>
                <th className={cx('table-custom phone-number')} scope="col">
                    Số điện thoại khách hàng
                </th>

                <th className={cx('table-custom amount')} scope="col">
                    Tổng số tiền mua hàng
                </th>
                <th className={cx('table-custom time')} scope="col">
                    Thời gian xuất hóa đơn
                </th>

                <th className={cx('table-custom')} scope="col">
                    Chi tiết đơn hàng
                </th>

                <th className={cx('table-custom')} scope="col">
                    Tác vụ
                </th>
            </tr>
        </thead>
    );
}

export default Header;
