import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

import NavBar from './components/Navbar' // Asegúrate de que la ruta es correcta

import Login from './components/login'
import Dashboard from './components/dashboard'
import EmployeePortal from './components/employeeportal'
import Employees from './components/employees'
import Inventory from './components/inventory'
import Offices from './components/offices'
import Tickets from './components/tickets'

function RutaPrivada({ children }) {
  const { estaLogueado } = useAuthStore();
  
  if (!estaLogueado) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <div>
      

      <NavBar />

      <div>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<RutaPrivada><Dashboard /></RutaPrivada>} />
          <Route path="/employeeportal" element={<RutaPrivada><EmployeePortal /></RutaPrivada>} />
          <Route path="/employees" element={<RutaPrivada><Employees /></RutaPrivada>} />
          <Route path="/offices" element={<RutaPrivada><Offices /></RutaPrivada>} />
          <Route path="/tickets" element={<RutaPrivada><Tickets /></RutaPrivada>} />
          <Route path="/inventory" element={<RutaPrivada><Inventory /></RutaPrivada>} />
        </Routes>
      </div>

    </div>
  )
}

export default App