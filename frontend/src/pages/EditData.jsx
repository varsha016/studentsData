import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditData({ isOpen, onClose, onSave, studentData }) {
    const [formData, setFormData] = useState({
        name: studentData?.name || '',
        email: studentData?.email || '',
        mobile: studentData?.mobile || '',
        resume: null,
        existingResume: studentData?.resume || null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (studentData) {
            setFormData(prev => ({
                ...prev,
                name: studentData.name,
                email: studentData.email,
                mobile: studentData.mobile,
                existingResume: studentData.resume
            }));
        }
    }, [studentData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                resume: file
            }));
        }
    };

    const handleRemoveFile = () => {
        setFormData(prev => ({
            ...prev,
            resume: null,
            existingResume: null
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('mobile', formData.mobile);

            if (formData.resume) {
                formDataToSend.append('resume', formData.resume);
            } else if (formData.existingResume) {
                formDataToSend.append('existingResume', formData.existingResume);
            }

            await axios.put(
                `http://localhost:5000/api/updatestudent/${studentData._id}`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setLoading(false);
            onSave();
            onClose();
        } catch (err) {
            setLoading(false);
            setError('Error updating data');
            console.error(err);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-50`}>
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Student Data</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Resume</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
                        />
                        {formData.existingResume && !formData.resume && (
                            <div className="mt-2 text-sm text-gray-500">
                                <p className="truncate max-w-full">Current Resume: {formData.existingResume}</p>
                                <button
                                    type="button"
                                    onClick={handleRemoveFile}
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    Remove
                                </button>
                            </div>
                        )}

                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditData;
