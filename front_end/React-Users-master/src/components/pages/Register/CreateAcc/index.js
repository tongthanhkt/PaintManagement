import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './CreateAcc.module.scss';
import axios from 'axios';

import './index.css'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


function CreateAcc() {


    const [signupInfo, setSignupInfo] = useState({
        username: '',
        password: '',
    });

    const { username, password } = signupInfo;



    const onInputChange = (e) => {
        setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();
        await axios.post('https://be-paint-management1.onrender.com/user/sign-up', signupInfo)
                    .then(() =>{
                        alert('Tạo tài khoản thành công')
                        window.location = '/'
                    })



                    .catch(() => {
                        alert('Tạo tài khoản thất bại')
                    })
           
    };

    return (
        <section
            className={cx('vh-100')}
            style={{ backgroundColor: '#508bfc' }}
        >
            <div className={cx('container py-5 h-100')}>
                <div
                    className={cx(
                        'row d-flex justify-content-center align-items-center h-100',
                    )}
                >
                    <div className={cx('col-12 col-md-8 col-lg-6 col-xl-5')}>
                        <div
                            className={cx('card shadow-2-strong')}
                            style={{ borderRadius: '1rem' }}
                        >
                            <div className={cx('card-body p-5 text-center')}>
                                <h3 className={cx('mb-5')}>Tạo tài khoản</h3>

                                <div className={cx('form-outline mb-4')}>
                                    <input
                                        type="text"
                                        id="typeEmailX-2"
                                        className={cx(
                                            'form-control form-control-lg',
                                        )}
                                        placeholder="Tên đăng nhập"
                                        name="username"
                                        value={username}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>

                                <div className={cx('form-outline mb-4')}>
                                    <input
                                        type="password"
                                        id="typePasswordX-2"
                                        className={cx(
                                            'form-control form-control-lg',
                                        )}
                                        placeholder="Mật khẩu"
                                        name="password"
                                        value={password}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </div>

                                <button
                                    className={cx(
                                        'btn btn-primary btn-lg btn-block',
                                    )}
                                    type="submit"
                                    onClick={submit}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateAcc;