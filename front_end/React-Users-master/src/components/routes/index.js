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
import CreateAcc from '../pages/Register/CreateAcc';
import SelectSide from '../pages/SelectSide';
import NavbarMaterial from '../../Material/components/NavbarMaterial';
import HomeMaterial from '../../Material/components/HomeMaterial';
import AddProductMaterial from '../../Material/components/AddProductMaterial';

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
    { path: '/createaccount', component: CreateAcc, layout: Navbar },
    { path: '/homematerial', component: HomeMaterial, layout: NavbarMaterial },
    { path: '/addproductmaterial', component: AddProductMaterial, layout: NavbarMaterial },
    { path: '/select', component: SelectSide, layout: null },
    { path: '/', component: Login, layout: null },

];

const privateRoutes = [{ path: '/', component: Login, layout: null }];

export { publicRoutes, privateRoutes };
