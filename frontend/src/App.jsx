import { Routes, Route } from 'react-router-dom';
import Resume from './components/Resume';
import Landing from './components/Landing';

function App(){
  return (
    <Routes>
      <Route path='' element={<Landing />}/>
      <Route path='/resume' element={<Resume />}/>
      <Route path='/home' element={<Landing />}/>
    </Routes>
  );
}

export default App;