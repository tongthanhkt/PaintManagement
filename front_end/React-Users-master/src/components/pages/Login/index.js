import styles from './Login.module.scss';
import className from 'classnames/bind';
const cx = className.bind(styles);

function Login() {
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
                                    />
                                </div>

                                <button
                                    className={cx(
                                        'btn btn-primary btn-lg btn-block',
                                    )}
                                    type="submit"
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
