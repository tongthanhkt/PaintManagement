import styles from './DetailProductsExport.module.scss';
import classNames from 'classnames/bind';
import ButtonConfirmExport from '../../ButtonConfirmExport';

const cx = classNames.bind(styles);

function DetailProductsExport({ props }) {
    return (
        <div className={cx('container')}>
            <div className={cx('py-4')}>
                <h1 className={cx('header-title')}>Chi tiết xuất hàng</h1>
                <table className={cx('table', 'table-bordered')}>
                    <thead className={cx('thead-dark')}>
                        <tr>
                            <th className={cx('table-custom')} scope="col">
                                # Id
                            </th>
                            <th className={cx('table-custom')} scope="col">
                                Tên sản phẩm
                            </th>

                            <th className={cx('table-custom')} scope="col">
                                Số lượng sản phẩm
                            </th>

                            <th className={cx('table-custom')} scope="col">
                                Họ và tên khách hàng
                            </th>

                            <th className={cx('table-custom')} scope="col">
                                Số điện thoại
                            </th>

                            <th className={cx('table-custom')} scope="col">
                                Địa chỉ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className={cx('table-custom')} scope="row"></th>
                            <td className={cx('table-custom')}></td>
                            <td className={cx('table-custom')}></td>

                            <td className={cx('table-custom')}>
                                <input />
                            </td>

                            <td className={cx('table-custom')}>
                                <input />
                            </td>

                            <td className={cx('table-custom')}>
                                <input />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DetailProductsExport;
