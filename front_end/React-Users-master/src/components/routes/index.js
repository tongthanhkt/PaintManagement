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
import DetailBillExportMaterial from '../../Material/components/DetailBillExportMaterial';
import DetailProductMaterial from '../../Material/components/DetailProductMaterial'
import EditProductMaterial from '../../Material/components/EditProductMaterial';
import AllBillExportMaterial from '../../Material/components/AllBillExportMaterial';
import CustomerIncomeMaterial from '../../Material/components/CustomerIncomeMaterial';

const publicRoutes = [
    { path: '/home', component: Home, layout: Navbar },
    { path: '/products/add', component: AddProduct, layout: Navbar },
    { path: '/products/edit/:id', component: EditProduct, layout: Navbar },
    { path: '/productsmaterial/edit/:id', component: EditProductMaterial, layout: NavbarMaterial },
    { path: '/products/:id', component: DetailProduct, layout: Navbar },
    { path: '/productsmaterial/:id', component: DetailProductMaterial, layout: NavbarMaterial },
    { path: '/exportproduct', component: ExportProduct, layout: Navbar },
    { path: '/detailallbillexport', component: AllBillExport, layout: Navbar },
    { path: '/detailallbillexportmaterial', component: AllBillExportMaterial, layout: NavbarMaterial },
    {
        path: '/detailbillexport/:id',
        component: DetailBillExport,
        layout: Navbar,
    },
    {
        path: '/detailbillexportmaterial/:id',
        component: DetailBillExportMaterial,
        layout: NavbarMaterial,
    },
    { path: '/customerincome', component: CustomerIncome, layout: Navbar },
    { path: '/customerincomematerial', component: CustomerIncomeMaterial, layout: NavbarMaterial },
    { path: '/createaccount', component: CreateAcc, layout: Navbar },
    { path: '/homematerial', component: HomeMaterial, layout: NavbarMaterial },
    { path: '/addproductmaterial', component: AddProductMaterial, layout: NavbarMaterial },
    { path: '/select', component: SelectSide, layout: null },
    { path: '/', component: Login, layout: null },

];

const privateRoutes = [{ path: '/', component: Login, layout: null }];

export { publicRoutes, privateRoutes };
