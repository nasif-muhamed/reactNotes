
// Note.jsx
import React, { useState } from 'react'

const Note = ({note, onDelete}) => {
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US')
    const [textColor, setTextColor] = useState('text-black') 

    return (
        <div className=''>
            <div className="bg-white p-4 rounded-md shadow-lg drop-shadow-2xl bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${note.backgroundImage})`}}>
                <h3 className={`text-lg ${textColor} font-medium mb-2`}>{note.title}</h3>
                <p className={`${textColor} mb-2`}>{note.content}</p>
                <div className="flex items-center justify-between">
                    <p className={`${textColor} text-sm`}>{formattedDate}</p>
                    <button
                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                        onClick={() => onDelete(note.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className='p-3 w-full bg-transparent flex flex-wrap gap-3'>
                <button className='w-5 border-2 border-black h-5 rounded-full bg-green-500' onClick={()=>setTextColor('text-green-500')} ></button>
                <button className='w-5 border-2 border-black h-5 rounded-full bg-black' onClick={()=>setTextColor('text-black')} ></button>
                <button className='w-5 border-2 border-black h-5 rounded-full bg-red-500' onClick={()=>setTextColor('text-red-500')} ></button>
                <button className='w-5 border-2 border-black h-5 rounded-full bg-white' onClick={()=>setTextColor('text-white')} ></button>
            </div>
        </div>
    )
}

export default Note
