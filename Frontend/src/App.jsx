import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Bg from './Pages/Backround.jsx';


function App() {
  const [ count, setCount ] = useState(0);
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/Login' element={<Bg><Login /></Bg>} />
          <Route path='/Register' element={<Bg><Register /></Bg>} />
          <Route path='/Dashboard' element={<Bg><Dashboard /></Bg>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;