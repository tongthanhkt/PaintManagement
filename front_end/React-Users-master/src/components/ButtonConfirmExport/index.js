import axios from 'axios';


const urlExport = 'http://localhost:9000/products/create-paint-export';

function ButtonConfirmExport({props}) {
    console.log(props)
    const onSubmit = async () => {
        axios.post(urlExport, props).catch(function() {
            alert('Vui lòng kiểm tra lại!!');
        });
    };

    return ( <button onClick={onSubmit}>Xác nhận xuất hàng</button> );
}

export default ButtonConfirmExport;