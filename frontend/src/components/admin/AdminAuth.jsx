
// AdminAuth.jsx
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { setUser } from '../../actions/ProjectActions'

const AdminAuth = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState(null)
    const dispatch = useDispatch()
    const user = useSelector(state => state.userData)
    const { loading, success, userData} = user

    useEffect(() => {
        dispatch(setUser())
        console.log('useEFFect')
    }, [dispatch])

    useEffect(() => {
        
        if (userData?.username){
            if (userData?.isStaff) setIsAuthorized(true);
            else setIsAuthorized(false);
        }

    }, [userData])        

    if (isAuthorized === null) return <div>Loading....</div>

    return isAuthorized ? children : <Navigate to='*' />

}

export default AdminAuth
