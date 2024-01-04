import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

import PrivateUserRoute from '@/components/UserSession/PrivateUserRoute';
import UserSessionContainer from '@/components/UserSession/UserSessionContainer';
import LandingPageContainer from '@/pages/LandingPage/LandingPageContainer';

const HomeLanding = loadable(() => import('@/pages/LandingPage/HomeLanding.jsx'))
const LogInPage = loadable(() => import('@/pages/LandingPage/LogInPage.jsx'))
const SignInPage = loadable(() => import('@/pages/LandingPage/SignInPage'));
const ForgotPassword = loadable(() => import('@/pages/LandingPage/ForgotPassword.jsx'));
const ConfirmAccount = loadable(() => import('@/pages/ConfirmAccount.jsx'))
const ChangePassword = loadable(() => import('@/pages/ChangePassword/ChangePassword.jsx'))
const HomeUser = loadable(() => import('@/pages/UserSession/HomeUser.jsx'))
const ProfileUser = loadable(() => import('@/pages/UserSession/ProfileUser.jsx'))
const CategoriesUser = loadable(() => import('@/pages/UserSession/CategoriesUser.jsx'))
const ProductsPage = loadable(() => import('@/pages/UserSession/ProductsPage/ProductsPage.jsx'))
const CatalogsPage = loadable(() => import('@/pages/CatalogsPage.jsx'))
const ProductDetailsPage = loadable(() => import('@/pages/UserSession/ProductDetailsPage.jsx'))


function App() {
    return (
        <Routes>
            <Route path='/' element={<LandingPageContainer />}>
                <Route index path='' element={<HomeLanding />} />
                <Route path='log-in' element={<LogInPage />} />
                <Route path='sign-in' element={<SignInPage />} />
                <Route path='forgotpassword' element={<ForgotPassword />} />
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
                <Route index element={<HomeUser />} />
                <Route path='profile' element={<ProfileUser />} />
                <Route path='categories' element={<CategoriesUser />} />
                <Route path='products' element={<ProductsPage />} />
                <Route path='products/:productId' element={<ProductDetailsPage />} />
                <Route path='catalogs' element={<CatalogsPage />} />
            </Route>
        </Routes>
    )
}

export default App
