import React from 'react'
import { useNavigate } from 'react-router-dom'


const Roomhome = () => {
    const navigate=useNavigate();
    const handleCreateRoom= () => {
        navigate(`/room/${Date.now()}`);
    }

  return (
    <div>Roomhome
    <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  )
}

export default Roomhome