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
import JobRegistrations from './Components/Jobregistrations';
import Joblist from './Components/Joblist';
import Approve from './Components/Approve';
import Qusers from './Components/Qusers';
import AscoreTable from './Components/Ascoretable';
import Ucompilers from './Components/Ucompilers';
import Fourweek from './Components/Fourweek';
import UsersList from './Components/Userlist';
import MonthPage from './Components/Monthpage';
import Usertimeslots from './Components/Usertimeslots';
import Dashboard from './Components/Dashboard';
import Aanswer from './Components/Aanswer';
import Aanswerview from './Components/Aanswerview';
import Passedtestcass from './Components/Passedtestcass';
import AddAnswers from './Components/Addanswers';
import Passeddisplay from './Components/Passeddisplay';
import Profilepage from './Components/Profilepage';
import Updation from './Components/Updation';
import UpdateQuestions from './Components/Updatequestions';
import Codingupdate from './Components/Codinqupdate';





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
      <Route path='/approve' element={<Approve />}/>
      <Route path="/profilepage" element={<Profilepage/>} />
   
      <Route path='/AdminSignIn' element={<AdminSignIn />}/>
      <Route path="/dashboard" element={<Dashboard/>} />



      <Route path='/AddJob' element={<AddJob />}/>
      <Route path='/ViewJobs' element={<ViewJobs />}/>
      <Route path="/jobs" element={<Joblist />} />
      <Route path="/jobs/:jobId/registrations" element={<JobRegistrations />} />


      <Route path="/Addoffcampus" element={<Addoffcampus />} />
      <Route path="/Soffcampus" element={<Soffcampus/>} />

      <Route path="/userlist" element={<UsersList/>} />
      <Route path="/monthpage" element={<MonthPage/>} />
      <Route path="/user/timeslots" element={<Usertimeslots />} />

       



        
    <Route path='/addquestions' element={<Addquestions />}/>
   <Route path='/weekreview' element={<Weekreview />}/>
   <Route path='/week/:week' element={<Quizdisplay />}/> 
   <Route path='/aanswer' element={<Aanswer />}/> 
   <Route path='/aanswerview' element={<Aanswerview />}/> 
   <Route path='/updation' element={<Updation />}/> 
   <Route path='/updatequestions' element={<UpdateQuestions />}/> 


   <Route path="/weeklist" element={<Aweekslist />} />
   <Route path="/submissions/:week" element={<AweekSubmissions />} />
   <Route path="/Qusers" element={<Qusers/>} />//users submission
   <Route path="/scoretable" element={<AscoreTable />} />


   <Route path="/Codingq" element={<Codingq />} />
   <Route path="/Cweeks" element={<Cweeks />} />
   <Route path="/compiler/:week" element={<Compiler />} />
   <Route path="/Codingupdate" element={<Codingupdate />} />

   <Route path="/submissionweeks" element={<Weekcompilers/>} />
   <Route path="/submissions/week/:week" element={<Csubmissiondetails/>} />
   <Route path="/Ucompilers" element={<Ucompilers/>} />
   <Route path="/Fourweek" element={<Fourweek/>} />
   <Route path="/pasttestcases" element={<Passedtestcass/>} />
   <Route path="/addanswers" element={<AddAnswers/>} />
   <Route path="/passeddisplay" element={<Passeddisplay/>} />
  

 
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
