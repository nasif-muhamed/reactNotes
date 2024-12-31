import React, { useState } from 'react'
import UserManagement from '../../components/admin/UserManagement'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react';

const AdminDashboard = () => {

    return (
        <div className='min-h-screen bg-black py-10 md:py-20 px-10 md:px-20'>
            <div className='w-full flex justify-between mb-6 md:mb-16'>

                <Link to='/' ><ArrowLeft className='text-white' size={24} /></Link>

                <Link to='/logout' >
                    <button className='bg-red-600 text-white py-1 px-2 rounded-lg font-semibold' >Logout</button>
                </Link>

            </div>
            <UserManagement />
        </div>
    )
}

export default AdminDashboard
