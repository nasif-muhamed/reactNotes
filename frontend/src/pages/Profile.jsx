
import React, { useEffect, useState } from 'react';
import { Camera, Book, ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../actions/ProjectActions';
import { Link } from 'react-router-dom';
import api from '../api';


const Profile = () => {
    const [profileImage, setProfileImage] = useState("/api/placeholder/150/150");
    const [isHovering, setIsHovering] = useState(false);
    const dispatch = useDispatch()
    const user = useSelector(state => state.userData)
    const {loading, success, userData, error} = user

    useEffect(()=>{
        dispatch(setUser())
    }, [dispatch])

    const handleImageUpload = (event) => {
        console.log('image upload')
        const file = event.target.files[0];
        let formData = new FormData();
        formData.append("image", file)

        if (file) {
            api.post("/api/userprofile/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                if (res.status === 200){
                    alert('Profile Updated'); 
                    dispatch(setUser());
                }
                else alert('Failed to upload Profile.');
            }).catch(error => alert(error.message)); 
        }
    };

    const baseUrl = import.meta.env.VITE_API_URL 


    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="relative h-48 bg-black p-5">
                        <Link to='/' ><ArrowLeft className='text-white' size={24} /></Link>
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div
                                className="relative"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                <img
                                    src={userData?.image ? `${baseUrl}${userData.image}` : "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg="}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover"
                                />
                                <label
                                    className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'
                                        }`}
                                >
                                    <Camera className="w-8 h-8 text-white" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Profile Info Section */}
                    <div className="pt-20 pb-8 px-4 sm:px-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900">{userData?.username}</h1>

                            {/* Stats */}
                            <div className="mt-6 flex justify-center items-center">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <Book className="w-6 h-6 text-blue-600" />
                                        <span className="mt-1 text-xl font-semibold text-gray-900">{userData?.totalNotes}</span>
                                        <span className="text-sm text-gray-500">Notes</span>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <div className="text-sm font-medium text-gray-600">Member since</div>
                                        <div className="text-gray-900">{userData?.createdAt}</div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
