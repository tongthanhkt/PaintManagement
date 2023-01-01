import React, { useState } from 'react';
import styles from './CustomerIncome.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import './index.css';

const cx = classNames.bind(styles);

function CustomerIncome() {
    const [phoneNumber, setPhoneNumber] = useState();
    const [customerIncome, setCustomerIncome] = useState([]);
    const [detailExport, setDetailExport] = useState([]);
    const wrapper = document.querySelector('.wrapper-income');

    const onSubmit = async () => {
        await axios
            .get(
                `https://be-paint-management1.onrender.com/products/paint/income-customer/${phoneNumber}`,
            )

            .then((response) => {
                setCustomerIncome(response.data);

                setDetailExport(response.data.customerPaintExport);
            })

            .catch(() => {
                alert('Số vừa nhập chưa được lưu trong hệ thống');
            });

        wrapper.style.display = 'block';
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
                        className={cx('btn btn-success', 'btn-block')}
                        style={{
                            fontSize: '14px',
                            width: '200px',
                            marginTop: '20px',
                        }}
                    >
                        Tra cứu
                    </button>
                </div>
            </div>

            <div className="wrapper-income">
                <div className="w-75 mx-auto shadow p-5 detail">
                    <h2 className="text-center mb-4">Thông tin khách hàng</h2>
                    <form>
                        <div class="mb-3">
                            <label class="form-label">Tên khách hàng</label>

                            <input
                                type="text"
                                class="form-control form-control-lg form-item form-edit "
                                id="inputItem"
                                value={customerIncome.full_name}
                                disable
                                readOnly
                            />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Địa chỉ</label>

                            <input
                                type="text"
                                class="form-control form-control-lg form-item form-edit address"
                                id="inputItem"
                                value={customerIncome.address}
                                disable
                                readOnly
                            />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Số điện thoại</label>

                            <input
                                type="text"
                                class="form-control form-control-lg form-item form-edit "
                                id="inputItem"
                                value={customerIncome.phone_number}
                                disable
                                readOnly
                            />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">
                                Tổng giá trị hàng hóa (VND)
                            </label>

                            <input
                                type="text"
                                class="form-control form-control-lg form-item form-edit "
                                id="inputItem"
                                value={customerIncome.total_income_customer}
                                disable
                                readOnly
                            />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Chi tiết hóa đơn</label>

                            <ul>
                                {detailExport.map((data, index) => (
                                    <li key={index}>
                                        <Link
                                            class="btn btn-success btn-income"
                                            to={`/detailbillexport/${data.id}`}
                                            target="_blank"
                                        >
                                            Thời gian xuất hóa đơn{' '}
                                            {data.created_time}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CustomerIncome;
