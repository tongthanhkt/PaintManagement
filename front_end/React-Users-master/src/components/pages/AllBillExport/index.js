import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function AllBillExport() {
    const url = 'http://localhost:9000/products/list-paint-export'
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        const result = await axios.get(url);
        const value = result.data
        setProducts(value);

    }


    console.log(products)


    return (<div></div>)
}

export default AllBillExport