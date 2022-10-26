import React, { useState } from 'react';
import styles from './CustomerIncome.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function CustomerIncome() {
    const [phoneNumber, setPhoneNumber] = useState();

    const [customerIncome, setCustomerIncome] = useState([]);
    const [detailExport, setDetailExport] = useState([]);

    const onSubmit = async () => {
        await axios
            .get(
                `http://localhost:9000/products/income-customer/${phoneNumber}`,
            )

            .then((response) => {
                setCustomerIncome(response.data);
                setDetailExport(response.data.customerPaintExport);
            })

            .catch(() => {
                alert('Số vừa nhập chưa chính xác, vui lòng kiểm tra lại');
            });
    };

    return (
        <div className={cx('container')}>
            <div className={cx('w-75 mx-auto', 'shadow p-5', 'wrapper')}>
                <h2 className={cx('text-center', 'mb-4')}>
                    Doanh số theo khách hàng
                </h2>
                <div>
                    <div className={cx('form-group')}>
                        <input
                            type="number"
                            className={cx('form-control', 'form-control-lg')}
                            placeholder="Nhập số điện thoại khách hàng"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={onSubmit}
                        className={cx('btn btn-primary', 'btn-block')}
                    >
                        Tra cứu
                    </button>
                </div>
            </div>

            <div
                className={cx('container', 'py-4')}
                style={{ marginTop: '40px', marginLeft: '120px' }}
            >
                <h3 style={{ fontSize: '30px', paddingBottom: '20px' }}>
                    Kết quả:
                </h3>
                <ul className={cx('list-group', 'w-50')}>
                    <li className={cx('list-group-item')}>
                        Họ và tên: {customerIncome.full_name}
                    </li>
                    <li className={cx('list-group-item')}>
                        Số điện thoại khách hàng: {customerIncome.phone_number}
                    </li>

                    <li className={cx('list-group-item')}>
                        Tổng giá trị hàng hóa (VND): {customerIncome.total_income_customer} 
                        
                    </li>

                    <li className={cx('list-group-item')}>
                        Chi tiết đơn hàng:
                        <ul>
                            {detailExport.map((data, index) => (
                                <li key={index}>
                                    <Link
                                        class="btn btn-success"
                                        to={`/detailbillexport/${data.id}`}
                                        target="_blank"

                                    >
                                        Thời gian xuất hóa đơn {data.created_time}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default CustomerIncome;
