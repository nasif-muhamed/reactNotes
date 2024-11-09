
// ProtectedRoute.jsx

import React, { useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'

const ProtectedRoute = ({children}) => {
    console.log('inside protect')
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        console.log('useEffect')
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const reFreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: reFreshToken
            })

            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }
        } catch (error){
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        console.log('isAuthorized1', isAuthorized)
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token){
            setIsAuthorized(false)
            return
        }
        console.log('token:', token)
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000
        console.log('decoded:', decoded)
        if (tokenExpiration < now){
            console.log('if:')
            await refreshToken()
        }else{
            console.log('else:')
            setIsAuthorized(true)
        }
        console.log('isAuthorized2', isAuthorized)
    }

    if  (isAuthorized === null){
        console.log('loading')
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to='/login' />
}

export default ProtectedRoute



