import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import Home from './pages/Home';
import CreateTripPage from './pages/CreateTripPage';
import SearchPage from './pages/SearchPage';
// import LoginPage from './pages/LoginPage';
import LoginPage from './pages/SignIn';
import useAuth from './hooks/useAuth';
import SignUpPage from './pages/SignUp';
import TripPage from './pages/Trippage';

function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();

    return authed === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

const RouterContent = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<LoginPage></LoginPage>} />
            <Route path="/registration" element={<SignUpPage></SignUpPage>} />
            <Route path="/publish-trip" element={<RequireAuth><CreateTripPage></CreateTripPage></RequireAuth>} />
            <Route path="/search" element={<RequireAuth><SearchPage></SearchPage></RequireAuth>} />
            <Route path="/trips/:tripId" element={<TripPage></TripPage>} />
        </Routes>
    </Router>
);

export default RouterContent;