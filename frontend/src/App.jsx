import { Routes, Route } from 'react-router-dom';
import Resume from './components/Resume';
import Landing from './components/Landing';
import JobFinder from './components/JobFinder';

function App(){
  return (
    <Routes>
      <Route path='' element={<Landing />}/>
      <Route path='/resume' element={<Resume />}/>
      <Route path='/home' element={<Landing />}/>
      <Route path='/jobfinder' element={<JobFinder />}/>
    </Routes>
  );
}

export default App;