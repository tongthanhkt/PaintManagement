import React from 'react';
import styles from '../../pages/AllBillExport/AllBillExport.module.scss';
import classNames from 'classnames/bind';
import './index.css'
const cx = classNames.bind(styles);

function HomeHeader() {
    return (
        <thead className={cx('thead-dark')} >
            <tr>
                <th className='stt' scope="col">
                    Số thứ tự
                </th>
                <th className='name' scope="col">
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
                <th style={{width: "200px"}} scope="col">
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
