import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);
    const [showbox, setShowbox] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [edit, setEdit] = useState(false);
    const [editIndex, setEditIndex] = useState();

    const navigate = useNavigate();

    const handleAdd = async () => {
        const token = localStorage.getItem('token');
        if (!title || !description) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const resAdd = await axios.post('/todo/addTodo', {
                title,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (resAdd.data?.data) {
                setData([...data, resAdd.data.data]);
                console.log('Task added successfully:', resAdd.data.data);
            } else {
                alert('Failed to add task');
            }

            setTitle('');
            setDescription('');
            setShowbox(false);
        } catch (err) {
            console.error(err);
            alert('Error adding task');
        }
    }

    const handleEdit = async () => {
        const token = localStorage.getItem('token');
        if (!title || !description) {
            alert('Please fill in all fields');
            return;
        }
        try {
            const resEdit = await axios.put(`/todo/editTodo/${editIndex-1}`, {
                title,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (resEdit.data?.data) {
                const updatedData = data.map((item, index) => {
                    if (index === editIndex-1) {
                        return { ...item, title: resEdit.data.data.title, description: resEdit.data.data.description };
                    }
                    return item;
                });
                setData(updatedData);
                console.log('Task edited successfully:', resEdit.data.data);
            } else {
                alert('Failed to edit task');
            }
            setTitle('');
            setDescription('');
            setEdit(false);
        } catch (err) {
            console.error(err);
            alert('Error editing task');
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleDelete = async (index) => {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.delete(`/todo/deleteTodo/${index}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                const newData = [...data];
                newData.splice(index, 1); // remove item from state
                setData(newData);
            } else {
                alert('Failed to delete task');
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting task');
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');

            try {
                const res = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage(res.data.message);
                setData(res.data.data || []);
            } catch (err) {
                console.error(err);
                setMessage('Unauthorized');
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className='profile_div'>

            <div className='profile-header'>
                <h1>{message}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className='todo-card'>
                <h2>Your ToDo-List:</h2>
                <button onClick={() => {setShowbox(true); setEdit(false);}}>Add Task</button>
                <button style={{ backgroundColor: 'skyblue', margin:'0px 10px', width:'100px' }} onClick={() => {setShowbox(false); setEdit(true);}}>Edit</button>

                {showbox && (
                    <div className="showbox">
                        <h2>Add a Todo</h2>
                        <input type="text" placeholder="Enter Title" value={title} onChange={e => setTitle(e.target.value)} />
                        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} /><br />
                        <button onClick={() => setShowbox(false)}>Cancel</button>
                        <button onClick={handleAdd}>Save</button>
                    </div>
                )}

                {edit && (
                    <div className="showbox">
                        <h2>Edit a Todo</h2>
                        <input type="text" placeholder="Enter Index no." value={editIndex} onChange={e => setEditIndex(e.target.value)} />
                        <input type="text" placeholder="Enter Title" value={title} onChange={e => setTitle(e.target.value)} />
                        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} /><br />
                        <button onClick={() => setEdit(false)}>Cancel</button>
                        <button onClick={handleEdit}>Save</button>
                    </div>
                )}

                {data.length > 0 ? (
                    <ul>
                        {data.map((item, index) => (
                            <div>
                                <li key={index}>
                                    <span style={{ fontWeight: 'bold' }}>{index + 1}.</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p>Last Updated At: {new Date(item.updatedAt).toLocaleString()}</p>
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </li>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>No Work Pending :)</p>
                )}
            </div>
        </div>
    );
}
export default Profile;
