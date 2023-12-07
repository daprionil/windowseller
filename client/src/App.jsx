import { Route, Routes } from 'react-router-dom';
import LandingPageContainer from './pages/LandingPage/LandingPageContainer';
import HomeLanding from './pages/LandingPage/HomeLanding';
import LogInPage from './pages/LandingPage/LogInPage';
import SignInPage from './pages/LandingPage/SignInPage';
import ConfirmAccount from './pages/ConfirmAccount';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/LandingPage/ForgotPassword';
import HomeUser from './pages/UserSession/HomeUser';
import PrivateUserRoute from './components/UserSession/PrivateUserRoute';
import ProfileUser from './pages/UserSession/ProfileUser';
import CategoriesUser from './pages/UserSession/CategoriesUser';
import UserSessionContainer from './components/UserSession/UserSessionContainer';
import ProductsPage from './pages/ProductsPage';
import CatalogsPage from './pages/CatalogsPage';
import ProductDetailsPage from './pages/UserSession/ProductDetailsPage';

function App() {
    return (
        <Routes>
            <Route path='/' element={<LandingPageContainer/>}>
                <Route index path='' element={<HomeLanding />}/>
                <Route path='log-in' element={<LogInPage />}/>
                <Route path='sign-in' element={<SignInPage />}/>
                <Route path='forgotpassword' element={<ForgotPassword />}/>
            </Route>
            <Route path='/confirmaccount/:tokenId' element={<ConfirmAccount />} />
            <Route path='/changepassword/:tokenId' element={<ChangePassword />} />
            
            {/*//! Inside User Routes */}
            <Route
                path='/account'
                element={
                    <PrivateUserRoute>
                        <UserSessionContainer />
                    </PrivateUserRoute>
                }>
                <Route index element={<HomeUser />}/>
                <Route path='profile' element={<ProfileUser />}/>
                <Route path='categories' element={<CategoriesUser />}/>
                <Route path='products' element={<ProductsPage />}/>
                <Route path='products/:productId' element={<ProductDetailsPage />}/>
                <Route path='catalogs' element={<CatalogsPage />}/>
            </Route>
        </Routes>
    )
}

export default App
