import React from 'react'
import { useNavigate } from 'react-router-dom';
import Adminnavbar from './Adminnavbar';

const AdminRoomhome = () => {
 

const navigate=useNavigate();
    const handleCreateRoom= () => {
        navigate(`/Adminroom/${Date.now()}`);
    }

  return (
  
    <div>
         <Adminnavbar/>
         Roomhome
    <button onClick={handleCreateRoom}>Create Room</button>
 
    </div>
  )
}

export default AdminRoomhome