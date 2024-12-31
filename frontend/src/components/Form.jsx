import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
// import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../actions/ProjectActions'

const Form = ({ route, method, admin }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // const dispatch = useDispatch()
    // const user = useSelector(state => state.userData)
    // const { success, userData } = user
    // console.log('user out:', userData, userData?.username, userData?.isStaff)

    const handleSubmit = async (e) => {
        setLoading(true)
        setErr('')
        e.preventDefault()

        try {
            if (method === 'register') {
                let mistake = false
                if (!username || !email || !first_name || !password || !password2) {
                    setErr('Fill all the fields')
                    mistake = true
                }
                else if (username.length < 6){
                    setErr('username must contain atleast 6 characters')
                    mistake = true
                }
                else if (password !== password2) {
                    setErr('Password Mismatch')
                    mistake = true
                }
                else if (password.length < 8) {
                    setErr('Password must contain atleast 8 character')
                    mistake = true
                }
                if (mistake) return
            }

            if (method === 'login' && (!username || !password)) {
                setErr('Fill all the fields')
                return
            }

            if (method === 'login') {
                const res = await api.post(route, { username, password })
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                // dispatch(setUser())
                setUsername('')
                setPassword('')
                navigate('/')
            } else {
                const is_staff = admin
                const res = await api.post(route, { username, password, email, is_staff, first_name })
                setUsername('')
                setEmail('')
                setFirstName('')
                setPassword('')
                setPassword2('')
                navigate("/login")
            }

        } catch (error) {

            console.log(error, error.status)
            let status = error.status
            if (method === 'register' && status === 400) setErr('User with same username or email Exists')
            if (method === 'login' && status === 401) setErr('Invalid Credintials')

        } finally {

            setLoading(false)

        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className=''>
                <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                        </div>
                        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

                            <div className="max-w-[230px] mx-auto">
                                <div>
                                    <h1 className="text-2xl font-semibold">{admin ? 'Admin' : ''} {method === 'login' ? 'Login' : 'Sign Up'}</h1>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                                        <div className="relative">
                                            <input type='text' value={username} onChange={e => setUsername(e.target.value)}
                                                id="username" name="username" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Username" />
                                            <label htmlFor="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                                        </div>

                                        {
                                            method === 'register'
                                            &&
                                            <>
                                                <div className="relative">
                                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                                        id="email" name="email" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email" />
                                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                                                </div>
                                                <div className="relative">
                                                    <input type="text" value={first_name} onChange={e => setFirstName(e.target.value)}
                                                        id="name" name="name" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Name" />
                                                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
                                                </div>
                                            </>
                                        }


                                        <div className="relative">
                                            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                                                id="password" name="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Password" />
                                            <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter Password</label>
                                        </div>

                                        {
                                            method === 'register'
                                            &&
                                            <div className="relative">
                                                <input type="password" value={password2} onChange={e => setPassword2(e.target.value)}
                                                    id="password2" name="password2" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Re enter Password" />
                                                <label htmlFor="password2" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Re Enter Password</label>
                                            </div>
                                        }

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

                                        <div className="relative">
                                            <button type='submit' className="bg-cyan-500 text-white rounded-md px-2 py-1">Submit</button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* <div className="w-full flex justify-center">
                                <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                                    <span>Continue with Google</span>
                                </button>
                            </div> */}

                            <div className='my-4 text-sm'>
                                <h5>{method == 'login' ? "Doesn't have an account?" : "Already have an account?"} <Link to={method == 'login' ? '/register' : '/login'}><span className='text-blue-400 cursor-pointer'> {method == 'login' ? 'Signup' : 'Login'}</span></Link></h5>
                                {
                                    method == 'login' &&  <h5 className='mt-2'>Want to be an admin? <Link to='/admin_register'> <span className='text-blue-400 cursor-pointer'>Register Admin</span></Link></h5>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form
