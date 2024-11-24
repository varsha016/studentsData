import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditData from './EditData';

function AllData() {
    const [allData, setAllData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudentData, setSelectedStudentData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/getstudents");
            setAllData(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/deletestudent/${id}`);
            setAllData(allData.filter(student => student._id !== id));
        } catch (error) {
            console.log('Error deleting student:', error);
        }
    };

    const handleEdit = (student) => {
        setSelectedStudentData(student);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStudentData({});
    };

    const handleSave = () => {
        getData();
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <h1 className="text-3xl font-bold text-center text-gray-800 p-6">
                    All Students Data
                </h1>
                <div className='text-end m-3'>

                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Add Form
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Mobile
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Resume
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allData?.map((student) => (
                                <tr key={student._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {student.name}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {student.email}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {student.mobile}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {student.resume ? (
                                            <img src={`data:image/jpeg;base64,${student.resume}`} alt="Resume" className="w-8 h-8 object-cover" />
                                        ) : (
                                            <span className="text-gray-500">No Resume</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-2">
                                        <button
                                            onClick={() => handleEdit(student)}
                                            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(student._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <EditData
                    studentData={selectedStudentData}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}

export default AllData;
