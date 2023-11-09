import { Route, Routes } from 'react-router-dom';
import LandingPageContainer from './pages/LandingPage/LandingPageContainer';
import HomeLanding from './pages/LandingPage/HomeLanding';
import LogInPage from './pages/LandingPage/LogInPage';
import SignInPage from './pages/LandingPage/SignInPage';
import ConfirmAccount from './pages/ConfirmAccount';

function App() {
    return (
        <Routes>
            <Route path='/' element={<LandingPageContainer/>}>
                <Route index path='' element={<HomeLanding />}/>
                <Route path='log-in' element={<LogInPage />}/>
                <Route path='sign-in' element={<SignInPage />}/>
            </Route>
            <Route path='/confirmaccount/:tokenId' element={<ConfirmAccount />}/>
        </Routes>
    )
}

export default App
