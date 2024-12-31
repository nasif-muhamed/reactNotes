
// App.jsx

import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Profile from './pages/Profile'
import Review from './pages/review'
import AdminAuth from './components/admin/AdminAuth'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRegister from './pages/admin/AdminRegister'

import './index.css';

import { useDispatch } from 'react-redux';
import { resetUser } from './actions/ProjectActions'

// import RedirectUser from './components/RedirectUser'

function Logout(){
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.clear();
        dispatch(resetUser()); 
    }, [dispatch]);

    return <Navigate to='/login' />
}

function RegisterAndLogout(){
    localStorage.clear()
    return <Register/>
}

function App() {

    return (
        <>
        <Router>
            <Routes>
                
                <Route path='/' element={<ProtectedRoute > <Home /> </ProtectedRoute>} ></Route>
                <Route path='/dashboard' element={<ProtectedRoute > <AdminAuth> <AdminDashboard /> </AdminAuth> </ProtectedRoute>} ></Route>
                <Route path='/profile' element={<ProtectedRoute > <Profile /> </ProtectedRoute>} ></Route>
                <Route path='/register' element={ <PublicRoute> <Register /> </PublicRoute> } ></Route>
                <Route path='/admin_register' element={ <PublicRoute> <AdminRegister /> </PublicRoute> } ></Route>
                <Route path='/login' element={ <PublicRoute> <Login /> </PublicRoute> } ></Route>
                <Route path='/logout' element={ <Logout />  } ></Route>
                <Route path='/review' element={ <Review />  } ></Route>
                
                {/* <Route path='/redirect_user' element={ <RedirectUser />  } ></Route> */}
                <Route path='*' element={ <NotFound /> } ></Route>

            </Routes>
        </Router>
        </>
    )
}

export default App
