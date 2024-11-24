import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Studentform = () => {
    const navigate = useNavigate()
    const [studentData, setStudentData] = useState({
        name: "",
        email: "",
        mobile: "",
        resume: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(studentData, "studentData");

        const formData = new FormData();
        formData.append('name', studentData.name);
        formData.append('email', studentData.email);
        formData.append('mobile', studentData.mobile);
        formData.append('resume', studentData.resume);

        // Log FormData entries to ensure data is being added
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await axios.post("http://localhost:5000/api/students", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response, "response");
            navigate('/alldata')
        } catch (error) {
            // Log the full error response for better debugging
            if (error.response) {
                console.error('Error Response:', error.response.data);
            } else {
                console.error('Error:', error.message);
            }
        }
    };


    // Function to handle file input change
    const handleFileChange = (e) => {
        setStudentData({ ...studentData, resume: e.target.files[0] });
    };
    const handleClear = () => {
        setStudentData({
            name: "",
            email: "",
            mobile: "",
            resume: null
        });
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-600 mb-6 text-center">Student Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={studentData.name}
                            onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={studentData.email}
                            onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            id="mobile"
                            value={studentData.mobile}
                            onChange={(e) => setStudentData({ ...studentData, mobile: e.target.value })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your mobile number"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
                        <input
                            type="file"
                            name="resume"
                            id="resume"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-x-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleClear}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            clear
                        </button>
                        <button
                            type="button"
                            onClick={() => setStudentData({ name: "", email: "", mobile: "", resume: null })}
                            className="px-4 py-2 bg-red-600 text-gray-100 rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Studentform;
