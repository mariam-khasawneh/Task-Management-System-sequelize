import React from 'react';
import Register from './component/register'; 
import Login from './component/Login';
import TaskHome from './component/TaskHome';
import ProtectedRoute from './component/ProtectedRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/taskhome" element={<ProtectedRoute><TaskHome /></ProtectedRoute>} />      
        </Routes>
      </Router>
    </div>
  );
}

export default App;
