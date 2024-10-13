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
import AdminRoomhome from './Components/AdminRoomhome';
import Adminroom from './Components/Adminroom';
 import Addquestions from './Components/Addquestions';
import Weekreview from './Components/Weekreview';
 import Quizdisplay from './Components/Quizdisplay';
import Aweekslist from './Components/Aweeklist';
import AweekSubmissions from './Components/Aweeksubmissions';
import Codingq from './Components/Codinq';
import Cweeks from './Components/Cweek';
import Compiler from './Components/Compiler';
import Weekcompilers from './Components/Weekcompilers';
import Csubmissiondetails from './Components/Csubmisiondetails';
import Addoffcampus from './Components/Addoffcampus';
import Soffcampus from './Components/Soffcampus';




function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Usignin />}/>
      <Route path='/roomhome' element={<Roomhome />}/>
      <Route path='/adminroomhome' element={<AdminRoomhome />}/>
      <Route path='/room/:roomid' element={<Room />}/>
      <Route path='/room/:roomid' element={<Room />}/>

      <Route path='/Adminroom/:roomid' element={<Adminroom />}/>
      <Route path='/Adminroom/:roomid' element={<Adminroom />}/>
      <Route path='/Ureg' element={<Ureg />}/>
   
      <Route path='/AdminSignIn' element={<AdminSignIn />}/>
      <Route path='/AddJob' element={<AddJob />}/>
      <Route path='/ViewJobs' element={<ViewJobs />}/>
      <Route path='/ViewRegistrations' element={<ViewRegistrations />}/>

      <Route path="/Addoffcampus" element={<Addoffcampus />} />
      <Route path="/Soffcampus" element={<Soffcampus/>} />
       

        
    <Route path='/addquestions' element={<Addquestions />}/>
   <Route path='/weekreview' element={<Weekreview />}/>
   <Route path='/week/:week' element={<Quizdisplay />}/> 

   <Route path="/weeklist" element={<Aweekslist />} />
   <Route path="/submissions/:week" element={<AweekSubmissions />} />


   <Route path="/Codingq" element={<Codingq />} />
   <Route path="/Cweeks" element={<Cweeks />} />
   <Route path="/compiler/:week" element={<Compiler />} />

   <Route path="/submissionweeks" element={<Weekcompilers/>} />

   <Route path="/submissions/week/:week" element={<Csubmissiondetails/>} />

 
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
