import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFillDrip, faTrowel } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useState } from 'react';

function SelectSide() {
    const [side, setSide] = useState();

    const getDataSide = (e) => {
        const dataSide = e.target.dataset.side;
        setSide(dataSide);
    };

    if (side === 'paint') {
        window.location = '/home';
    } else if (side === 'material') {
        window.location = '/homematerial';
    }

    return (
        <div className="select-wrapper">
            <div className="select-box">
                <h3 className="select-heading">CHỌN DANH MỤC</h3>

                <div className="select-card__wrap">
                    <div
                        className="card-side"
                        data-side="paint"
                        onClick={getDataSide}
                    >
                        <FontAwesomeIcon
                            icon={faFillDrip}
                            className="icon-paint"
                        />
                        <h3 className="card-desc">Sơn</h3>
                    </div>

                    <div
                        className="card-side"
                        data-side="material"
                        onClick={getDataSide}
                    >
                        <FontAwesomeIcon
                            icon={faTrowel}
                            className="icon-paint"
                        />
                        <h3 className="card-desc">Vật liệu xây dựng</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectSide;
