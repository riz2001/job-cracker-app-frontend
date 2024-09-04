import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Roomhome from './Components/Roomhome';
import Room from './Components/Room';
import Ureg from './Components/Ureg';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Roomhome />}/>
      <Route path='/room/:roomid' element={<Room />}/>
      <Route path='/room/:roomid' element={<Room />}/>
      <Route path='/Ureg' element={<Ureg />}/>
     
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
