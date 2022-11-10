import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Home from './pages/Home';
import CreateTripPage from './pages/CreateTripPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import useAuth from './hooks/useAuth';

function RequireAuth({ children }) {
    const { authed } = useAuth();

    return authed === true ? children : <Navigate to="/login" replace />;
}

const RouterContent = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<LoginPage></LoginPage>} />
            <Route path="/create-trip" element={<RequireAuth><CreateTripPage></CreateTripPage></RequireAuth>} />
            <Route path="/search" element={<RequireAuth><SearchPage></SearchPage></RequireAuth>} />
        </Routes>
    </Router>
);

export default RouterContent;