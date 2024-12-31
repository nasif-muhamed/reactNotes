import React, { useEffect, useState } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../api';
import UserTable from './UserTable';
import AddUser from './AddUser'

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    console.log('users::', users)

    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const itemsPerPage = 4;
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        console.log('useEffectFilter')
        if (query) {
            console.log('filter if')
            const results = users.filter(user => user.username.toLowerCase().includes(query.toLowerCase()))
            setFilteredUsers(results)
        }else{
            setFilteredUsers(users)
        }
    }, [query, users])


    const getUsers = () => {
        api.get('/api/admin/users/')
            .then(res => res.data)
            .then(data => {
                setUsers(data)
                setFilteredUsers(data)
            })
            .catch(err => alert(err));
    }

    const getCurrentUsers = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredUsers.slice(start, end);
    };

    // const handleDelete = async (userId) => {
    //     if (confirm("Deactivating user, Are you sure?")) {
    //         try{

    //             const response = await api.delete(`/api/admin/user/delete/${userId}/`)
    //             console.log(response)
    //             if (response.status === 200){
    //                 alert(response.data.message)
    //             }
    //             getUsers()

    //         }catch (error){

    //             if (error.response) {
    //                 alert(error.response.data.error);
    //             } else {
    //                 alert("An unexpected error occurred.");
    //             }

    //         }
    //     }else return
    // };

    // const handleActivate = async (userId) => {
    //     if (confirm("Activating user, Are you sure?")) {
    //         try{

    //             // const response = await api.delete(`/api/admin/user/delete/${userId}/`)
    //             console.log(response)
    //             if (response.status === 200){
    //                 alert(response.data.message)
    //             }
    //             getUsers()

    //         }catch (error){

    //             if (error.response) {
    //                 alert(error.response.data.error);
    //             } else {
    //                 alert("An unexpected error occurred.");
    //             }

    //         }
    //     }else return
    // }

    const handleEdit = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleUpdate = async (id, first_name, is_active) => {
        try {

            const response = await api.patch(`/api/admin/user/${id}/update/`, { first_name, is_active })
            if (response.status === 200) {
                alert(response.data.message)
            }
            setEditingUser(false);
            setIsModalOpen(false);
            getUsers()

        } catch (error) {

            if (error.response) {
                alert(error.response.data.error);
            } else {
                alert("An unexpected error occurred.");
            }

        }

    };

    return (

        <div className="w-full max-w-4xl mx-auto ">

            <div class="flex px-4 py-3 rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif] my-5 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                    class="fill-gray-600 mr-3 rotate-90">
                    <path
                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                    </path>
                </svg>
                <input type="text" placeholder="Search Something..." class=" w-full outline-none bg-transparent text-gray-600 text-sm" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>

            <div className="bg-white rounded-lg shadow-lg w-full">

                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">User Management</h2>
                        <button
                            onClick={handleCreate}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            <Plus className="w-4 h-4" /> Add User
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-gray-700 bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Username</th>
                                    <th className="px-6 py-3 font-medium">Full Name</th>
                                    <th className="px-6 py-3 font-medium">Email</th>
                                    <th className="px-6 py-3 font-medium text-center">Notes</th>
                                    <th className="px-6 py-3 font-medium text-center">Status</th>
                                    <th className="px-6 py-3 font-medium text-right">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getCurrentUsers().map((user) => (
                                    <UserTable key={user.id} user={user} handleEdit={handleEdit} />
                                    // <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                    //     <td className="px-6 py-4">{user.username}</td>
                                    //     <td className="px-6 py-4">{(user.email || 'Not Available')}</td>
                                    //     <td className="px-6 py-4">{user.notes_count}</td>
                                    //     <td className="px-6 py-4">
                                    //         <div className="flex justify-end gap-2">
                                    //             <button
                                    //                 onClick={() => handleEdit(user)}
                                    //                 className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                                    //             >
                                    //                 <Pencil className="w-4 h-4" />
                                    //             </button>
                                    //             <button
                                    //                 onClick={() => handleDelete(user.id)}
                                    //                 className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                                    //             >
                                    //                 <Trash2 className="w-4 h-4" />
                                    //             </button>
                                    //         </div>
                                    //     </td>
                                    // </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        {console.log('isModalopen')}
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold">
                                    {editingUser ? 'Update User' : 'Create User'}
                                </h3>
                            </div>

                            {editingUser ?
                                <UserUpdateForm
                                    user={editingUser}
                                    onUpdate={handleUpdate}
                                    onCancel={() => setIsModalOpen(false)}
                                />
                                :
                                <AddUser
                                    onCancel={() => setIsModalOpen(false)}
                                />
                            }

                        </div>
                    </div>
                )}

            </div>

        </div>
    );
};

const UserUpdateForm = ({ user, onUpdate, onCancel }) => {
    const [firstName, setFirstName] = useState(user.first_name);
    const [isActive, setIsActive] = useState(user.is_active);
    console.log(isActive)

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((firstName !== user.first_name) || (isActive !== user.is_active)) onUpdate(user.id, firstName, isActive)
        else onCancel()
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="space-y-2">
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(prev => !prev)}
                    className="border rounded"
                    min="0"
                    id="isActive" name="isActive"
                />
                <label htmlFor="isActive" className="text-sm font-medium ml-4">Is active?</label>
            </div>
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
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default UserManagement;
