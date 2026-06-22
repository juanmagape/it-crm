import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard'
import EmployeePortal from './components/employeeportal'
import Employees from './components/employees'
import Inventory from './components/inventory'
import Offices from './components/offices'
import Tickets from './components/tickets'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employeeportal" element={<EmployeePortal />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/offices" element={<Offices />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/inventory" element={<Inventory />} />

      </Routes>
    </>
  )
}

export default App
