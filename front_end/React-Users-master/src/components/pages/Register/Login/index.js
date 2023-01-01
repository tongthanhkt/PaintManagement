import styles from './Login.module.scss';
import className from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from 'axios';

const cx = className.bind(styles);

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    const { email, password } = loginInfo;

    const [isValid, setValid] = useState(false);

    const onInputChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();
        await axios
            .post('https://be-paint-management1.onrender.com/sign-in', loginInfo)
            .then((data) => {
                localStorage.setItem('accessToken', true);
            })

            .then((data) => {
                window.location = '/select';
            })

            .catch(() => {
                alert('Sai tên đăng nhập hoặc mật khẩu');
            });
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
                                <h3 className={cx('mb-5')}>Đăng nhập</h3>

                                <div className={cx('form-outline mb-4')}>
                                    <input
                                        type="text"
                                        id="typeEmailX-2"
                                        className={cx(
                                            'form-control form-control-lg',
                                        )}
                                        placeholder="Tên đăng nhập"
                                        name="email"
                                        value={email}
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
    );
}

export default Login;
