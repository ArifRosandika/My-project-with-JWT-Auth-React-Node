import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Navbar from './Components/Navbar.jsx';

function App() {
  const [count, setCount] = useState(0);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;