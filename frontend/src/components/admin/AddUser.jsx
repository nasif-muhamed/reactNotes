import React, { useState } from 'react'
import api from '../../api';

const AddUser = ({onCancel}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [err, setErr] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('')
        if (!first_name || !email || !username || !password){
            setErr('Fill all the fields')
            return
        } 
        else if (username.length < 6){
            setErr('username must contain atleast 6 characters')
            return
        }
        else if (password !== password2) {
            setErr('Password Mismatch')
            return
        }
        else if (password.length < 8) {
            setErr('Password must contain atleast 8 character')
            return
        }
        else {
            try{
                const res = await api.post('/api/user/register/', { username, password, email, first_name })
                setUsername('')
                setEmail('')
                setFirstName('')
                setPassword('')
                setPassword2('')
                onCancel()
                alert('User Created Successfully')
            }catch(error){
                console.log(error, error.status)
                let status = error.status
                if (status === 400) setErr('User with same username or email Exists')
            }
        } 
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <input
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Re Enter Password</label>
                <input
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            {
                err &&
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span style={{ wordBreak: 'break-word' }} className="font-medium break-words">{err}</span>
                    </div>
                </div>
            }

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Add User
                </button>
            </div>
        </form>
    );    
}

export default AddUser
