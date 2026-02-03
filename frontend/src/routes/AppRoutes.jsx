import { Navigate, Route, Routes } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/login' />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes