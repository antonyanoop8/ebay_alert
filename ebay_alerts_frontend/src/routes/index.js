import RequireAuth from 'components/RequireAuth';
import Alerts from 'pages/alerts/Alerts';
import CreateAlert from 'pages/alerts/CreateAlert';
import EditAlert from 'pages/alerts/EditAlert';
import Login from 'pages/authentication/Login';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Alerts />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/alerts"
                    element={
                        <RequireAuth>
                            <Alerts />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/alerts/:id"
                    element={
                        <RequireAuth>
                            <EditAlert />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/create-alert"
                    element={
                        <RequireAuth>
                            <CreateAlert />
                        </RequireAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
