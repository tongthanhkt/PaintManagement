import React from 'react';
import styles from '../../pages/AllBillExport/AllBillExport.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function HomeHeader() {
    return (
        <thead className={cx('thead-dark')}>
            <tr>
                <th className={cx('table-custom')} scope="col">
                    #Id
                </th>
                <th className={cx('table-custom')} scope="col">
                    Tên sản phẩm
                </th>
                <th className={cx('table-custom')} scope="col">
                    Giá mỗi sản phẩm (VND)
                </th>

                <th className={cx('table-custom')} scope="col">
                    Đơn vị tính
                </th>
                <th className={cx('table-custom')} scope="col">
                    Số lượng sản phẩm
                </th>
                <th className={cx('table-custom')} scope="col">
                    Tác vụ
                </th>
                <th className={cx('table-custom')} scope="col">
                    Xuất hàng
                </th>
            </tr>
        </thead>
    );
}

export default HomeHeader;
