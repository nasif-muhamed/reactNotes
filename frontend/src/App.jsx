import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css';

function Logout(){
    localStorage.clear()
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

                <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>} ></Route>
                <Route path='/login' element={ <Login /> } ></Route>
                <Route path='/logout' element={ <Logout /> } ></Route>
                <Route path='/register' element={ <Register /> } ></Route>
                <Route path='*' element={ <NotFound /> } ></Route>
        
            </Routes>
        </Router>
        </>
    )
}

export default App
