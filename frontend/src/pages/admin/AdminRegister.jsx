import React from 'react'
import Form from '../../components/Form'

const AdminRegister = () => {

    
    return (
        <div>
            <Form route='/api/user/register/' method='register' admin={true} />
        </div>
    )
}

export default AdminRegister
