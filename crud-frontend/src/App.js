import EmpForm from './components/Employee/EmpForm';
import DepForm from './components/Department/DepForm'
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Sidebar />
        <Routes>
          <Route exact path='/' element={<EmpForm />} />
          <Route exact path='/department' element={<DepForm />} />
        </Routes>
      </Router>
      {/* <EmpForm/> */}
      {/* <DepForm/> */}
    </div>
  );
}

export default App;
