import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home(props) {
    const navigate = useNavigate();
    return (
        <div className='home_div'>
            <h1>ToDo List</h1>
            <div>
            <button onClick={() => navigate('/joinus')}>Join Us</button>
            <button onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
    );
}

export default Home;