import React from 'react';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return token ? <Navigate to="/" /> : children;
};

export default PublicRoute;
