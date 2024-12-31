
// Home.js
import React, { useState, useEffect } from 'react'
import api from '../api'
import Note from '../components/Note'
import { Camera, Upload, Book } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../actions/ProjectActions'


const Home = () => {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [backgroundImage, setBackgroundImage] = useState(null)
    // const [profileData, setProfileData] = useState(null)

    const dispatch = useDispatch()
    const user = useSelector(state => state.userData)
    const { loading, success, userData} = user
    
    console.log(userData)
    useEffect(() => {
        dispatch(setUser())
    }, [dispatch])


    useEffect(() => {
        getNotes();
        // getProfile();
    }, [])

    const createNote = (e) => {
        e.preventDefault()
        if (!content.trim(), !title.trim()){
            alert('Fill the required fields')
            return
        }
        let formData = new FormData();
        formData.append("content", content);
        formData.append("title", title);
        if (backgroundImage) formData.append("backgroundImage", backgroundImage);

        api.post("/api/notes/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })

        .then(res => {
            if (res.status === 201) alert('Note created!');
            else alert('Failed to make note.');
            setContent('')
            setTitle('')
            setBackgroundImage(null)
            getNotes();
        }).catch(error => alert(error));        
    }
    
    const getNotes = () => {
        api.get("/api/notes/")
        .then(res => res.data)
        .then(data => setNotes(data) )
        .catch(err => console.log(err));
    }

    // const getProfile = async () => {
    //     try {
    //         const response = await api.get('/api/userprofile/');
    //         const data = response.data;
    //         if (response.status === 200) {
    //             setProfileData(data);
    //             console.log('User Profile:', data);
    //         } else {
    //             console.log('Error fetching user profile:', data);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user profile:', error);
    //     }
    // }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
        .then(res => {
            if (res.status === 204) alert("Note Deleted");
            else alert("Failed to delete note.");

            getNotes();
        })
        .catch(error => alert(error));
    }

    const baseUrl = import.meta.env.VITE_API_URL    

    return (
        <div className="py-10 flex flex-col items-center justify-center min-h-screen
         bg-black">

            <div className="w-full max-w-2xl bg-slate-100 p-8 shadow-lg rounded-lg">
                <div className='flex justify-between items-center mb-6 '>
                    <h2 className="text-2xl font-bold mb-0">Create a Note</h2>

                    <Link to='/logout' >
                        <button className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 font-semibold' >Logout</button>
                    </Link>
                </div>

                <form onSubmit={createNote} encType='multipart/form-data' className="space-y-4">

                    <div >
                        <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className="w-full border border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                        />
                    </div>

                    <div >
                        <label htmlFor="content" className="block font-medium text-gray-700 mb-1">
                            Content:
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                        ></textarea>
                    </div>
                    
                    <div className="mt-8">
                        <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Background Image
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={e => setBackgroundImage(e.target.files[0])}
                        />
                        </label>
                    </div>

                    <div className='flex justify-between items-center'>

                        <button
                            type="submit"
                            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                        >
                            Submit
                        </button>
                        {
                            userData?.isStaff  &&

                            <Link to= '/dashboard'>
                            <button className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 font-semibold' >{userData?.isStaff ? 'User Management' : 'Review'}</button>
                            </Link>
                        }

                    </div>
                </form>
            </div>

            <div className="mt-8 w-full max-w-2xl bg-slate-100 p-8 shadow-lg rounded-lg">
                <div className='mb-6 flex justify-between items-center md:px-5'>
                    <h2 className="text-2xl font-bold ">Notes</h2>
                    <Link to='/profile'>
                        <div className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden flex-shrink-0 border-4 border-black">
                            <img 
                            src={userData?.image ? `${baseUrl}${userData.image}` : "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg="}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            />
                        </div>
                    </Link>
                </div>
                {console.log('notes:', notes)}
                <div className="space-y-4">
                    {notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Home
