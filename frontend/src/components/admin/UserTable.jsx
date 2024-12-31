import React from 'react'
import { Pencil, CircleCheck, CircleX } from 'lucide-react';

const UserTable = ({user, handleEdit}) => {


    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4">{user.username}</td>
            <td className="px-6 py-4">{(user.first_name || 'Not Available')}</td>
            <td className="px-6 py-4">{(user.email || 'Not Available')}</td>
            <td className="px-6 py-4 text-center">{user.notes_count}</td>
            <td className="px-6 py-4 flex justify-center">
                {
                    // user.is_active ? 
                    // <button
                    //     onClick={() => handleDelete(user.id)}
                    //     className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                    // >
                    //     <CircleCheck className="w-4 h-4" />
                    // </button>
                    // :
                    // <button
                    //     onClick={() => handleActivate(user.id)}
                    //     className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                    // >
                    //     <CircleX className="w-4 h-4" />
                    // </button>
                    user.is_active ? <CircleCheck /> : <CircleX /> 
                }
            </td>
            <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => handleEdit(user)}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    
                </div>
            </td>
        </tr>
    )
}

export default UserTable
