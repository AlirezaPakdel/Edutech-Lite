import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import SchedulesPage from './pages/SchedulesPage';
import IncidentsPage from './pages/IncidentsPage';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    const isValidToken = token && token !== 'undefined' && token !== 'null';

    return isValidToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/schedules" element={<SchedulesPage />} />
                    <Route path="/incidents" element={<IncidentsPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
}