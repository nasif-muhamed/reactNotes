import React from 'react'
import Form from '../components/Form'

const Register = () => {

    return (
        <div>
            <Form route='/api/user/register/' method='register' admin={false}/>
        </div>
    )
}

export default Register
