
// Note.jsx
import React from 'react'

const Note = ({note, onDelete}) => {
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US')

    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-medium mb-2">{note.title}</h3>
            <p className="text-gray-700 mb-2">{note.content}</p>
            <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm">{formattedDate}</p>
                <button
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                    onClick={() => onDelete(note.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Note
