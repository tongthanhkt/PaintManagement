import Navbar from '../layout/Navbar';
import Home from '../pages/Home';
import AddProduct from '../products/AddProduct';
import EditProduct from '../products/EditProduct';
import DetailProduct from '../products/DetailProduct';
import ExportProduct from '../products/ExportProduct';
import AllBillExport from '../pages/AllBillExport';
import DetailBillExport from '../pages/DetailBillExport';
import Login from '../pages/Register/Login';
import CustomerIncome from '../pages/CustomerIncome';

const publicRoutes = [
    { path: '/home', component: Home, layout: Navbar },
    { path: '/products/add', component: AddProduct, layout: Navbar },
    { path: '/products/edit/:id', component: EditProduct, layout: Navbar },
    { path: '/products/:id', component: DetailProduct, layout: Navbar },
    { path: '/exportproduct', component: ExportProduct, layout: Navbar },
    { path: '/detailallbillexport', component: AllBillExport, layout: Navbar },
    {
        path: '/detailbillexport/:id',
        component: DetailBillExport,
        layout: Navbar,
    },
    { path: '/customerincome', component: CustomerIncome, layout: Navbar },
    { path: '/', component: Login, layout: null }
];

const privateRoutes = [{ path: '/', component: Login, layout: null }];

export { publicRoutes, privateRoutes };
