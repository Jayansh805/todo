import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Join(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/joinus', {
                name,
                email,
                password
            });
            if (res.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            console.error('Error joining:', err);
            alert('Failed to join. Please try again.');
        }
    };

    return (
        <div className='join_div'>
            <h1>Join Us</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label><br/>
                    <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label><br/>
                    <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label><br/>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Join</button>
            </form>
        </div>
    );
}

export default Join;