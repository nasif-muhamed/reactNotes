
// Home.js
import React, { useState, useEffect } from 'react'
import api from '../api'
import Note from '../components/Note'

const Home = () => {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        getNotes();
    }, [])

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", {content, title})
        .then(res => {
            if (res.status === 201) alert('Note created!');
            else alert('Failed to make note.');
            setContent('')
            setTitle('')
            getNotes();
        }).catch(error => alert(error));        
    }
    
    const getNotes = () => {
        api.get("/api/notes/")
        .then(res => res.data)
        .then(data => {setNotes(data); console.log('data:',data);})
        .catch(err => alert(err));
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
        .then(res => {
            if (res.status === 204) alert("Note Deleted");
            else alert("Failed to delete note.");

            getNotes();
        })
        .catch(error => alert(error));
    }
     
    return (
        <div className="py-10 flex flex-col items-center justify-center min-h-screen
         bg-black">
            <div className="w-full max-w-2xl bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Notes</h2>
                <div className="space-y-4">
                    {notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))}
                </div>
            </div>
            <div className="w-full max-w-2xl bg-white p-8 mt-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Create a Note</h2>
                <form onSubmit={createNote} className="space-y-4">
                    <div>
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
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block font-medium text-gray-700 mb-1">
                            Content:
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Home
