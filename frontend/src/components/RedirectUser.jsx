const UserForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
        user || { name: '', email: '', notesCount: 0 }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Notes Count</label>
                <input
                    type="number"
                    value={formData.notesCount}
                    onChange={(e) => setFormData({ ...formData, notesCount: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border rounded"
                    min="0"
                    required
                />
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
                    {user ? 'Save Changes' : 'Create User'}
                </button>
            </div>
        </form>
    );
};
