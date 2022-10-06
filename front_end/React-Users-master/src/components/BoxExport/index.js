import styles from './BoxExport.module.scss'
import classNames from 'classnames/bind'
import axios from "axios";
import { useParams } from "react-router-dom";
import React, {useState, useRef, useEffect} from 'react'



const cx = classNames.bind(styles)

function ButtonExport({children}) {
    const url = "http://localhost:9000/products/:id"
    const { amount } = useParams();

    const [amountExport, setAmountExport] = useState({
        xAmount: "",
        id: ""
    })

    const [newAmount, setNewAmount] = useState()



    const {xAmount} = amountExport

    const getCurrentAmount = async () => {
        const result = await axios.get(url);


        const value = result.data.reverse()


    }

    const onInputChange = e => {
        setAmountExport({ ...amountExport, [e.target.name]: e.target.value });
      };
    
    
    const handleToggle = () => {
        
    }

    return ( <div className={cx('wrapper')}>
        <button className={cx('btn', 'btn-success')}>
            Chọn
        </button>

        <input

            type='number'
            className = {cx('input')}
            placeholder='Nhập số lượng'
            name='amountExport'
            value={amountExport}
            onChange={e => onInputChange(e)}

        />

        <button onClick = {getCurrentAmount} className={cx('btn', 'btn-danger')}>
            Hủy
        </button>
    </div> )
}

export default ButtonExport;