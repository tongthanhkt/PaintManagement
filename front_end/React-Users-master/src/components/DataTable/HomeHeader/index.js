import React from 'react';
import styles from '../../pages/AllBillExport/AllBillExport.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function HomeHeader() {
    return (
        <thead className={cx('thead-dark')}>
            <tr>
                <th className={cx('table-edit', 'align-middle')} scope="col">
                    #Id
                </th>
                <th className={cx('table-edit', 'align-middle')} scope="col">
                    Tên sản phẩm
                </th>
                <th className={cx('table-edit', 'align-middle')} scope="col">
                    Giá mỗi sản phẩm (VND)
                </th>

                <th className={cx('table-edit', 'align-middle')} scope="col">
                    Đơn vị tính
                </th>
                <th className={cx('table-edit', 'align-middle')} scope="col">
                    Số lượng sản phẩm
                </th>
                <th className={cx('table-edit', 'align-middle')} scope="col">
                    Tác vụ
                </th>
                <th className={cx('table-edit', 'align-middle')} scope="col">
                    Xuất hàng
                </th>
            </tr>
        </thead>
    );
}

export default HomeHeader;
