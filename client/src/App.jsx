import { Route, Routes } from 'react-router-dom';
import LandingPageContainer from './pages/LandingPage/LandingPageContainer';
import HomeLanding from './pages/LandingPage/HomeLanding';
import LogInPage from './pages/LandingPage/LogInPage';
import SignInPage from './pages/LandingPage/SignInPage';

function App() {
    return (
        <Routes>
            <Route path='/' element={<LandingPageContainer/>}>
                <Route index path='' element={<HomeLanding />}/>
                <Route path='log-in' element={<LogInPage />}/>
                <Route path='sign-in' element={<SignInPage />}/>
            </Route>
        </Routes>
    )
}

export default App
