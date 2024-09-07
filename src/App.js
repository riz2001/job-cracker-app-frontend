import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Roomhome from './Components/Roomhome';
import Room from './Components/Room';
import Ureg from './Components/Ureg';
import Usignin from './Components/Usignin';
import LandingPage from './Components/LandingPage';
import AdminSignIn from './Components/AdminSignIn';
import AddJob from './Components/AddJob';
import ViewJobs from './Components/ViewJobs';
import ViewRegistrations from './Components/ViewRegistrations';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage />}/>
      <Route path='/room/:roomid' element={<Room />}/>
      <Route path='/room/:roomid' element={<Room />}/>
      <Route path='/Ureg' element={<Ureg />}/>
      <Route path='/Usignin' element={<Usignin />}/>
      <Route path='/AdminSignIn' element={<AdminSignIn />}/>
      <Route path='/AddJob' element={<AddJob />}/>
      <Route path='/ViewJobs' element={<ViewJobs />}/>
      <Route path='/ViewRegistrations' element={<ViewRegistrations />}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
