import Login from './components/Login';
import {Routes, Route} from 'react-router-dom'
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import Test from './components/Test';



function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/new/habit'/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </div>
  );
}

export default App;
