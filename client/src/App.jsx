import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppContext } from './context/AppContext'

import Landing from './Pages/Landing'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Members from './Pages/Members'
import Reports from './Pages/Reports'
import AnalyzeDetails from './Pages/AnalyzeDetails'
import Records from './Pages/Records'
import Vitals from './Pages/Vitals'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DashboardSidebar from './components/DashboardSidebar'
import DashboardNavbar from './components/DashboardNavbar'

function App() {
  const { token } = useContext(AppContext)

  return (
    <>
      <Toaster />
      <Routes>

        <Route path='/' element={<><Navbar /><Landing /><Footer /></>} />
        <Route path='/login' element={<><Navbar /><Login /><Footer /></>} />

        <Route path='/dashboard' element={token ? <><DashboardSidebar /><DashboardNavbar /><div className='ml-14 md:ml-64 mt-16'><Dashboard /></div></> : <Navigate to='/login' />} />
        <Route path='/members' element={token ? <><DashboardSidebar /><DashboardNavbar /><div className='ml-14 md:ml-64 mt-16'><Members /></div></> : <Navigate to='/login' />} />
        <Route path='/member/:id' element={token ? <><DashboardSidebar /><DashboardNavbar /><div className='ml-14 md:ml-64 mt-16'><Reports /></div></> : <Navigate to='/login' />} />
        <Route path='/report/:id' element={token ? <><DashboardSidebar /><DashboardNavbar /><div className='ml-14 md:ml-64 mt-16'><AnalyzeDetails /></div></> : <Navigate to='/login' />} />
        <Route path='/records' element={token ? <><DashboardSidebar /><DashboardNavbar /><div className='ml-14 md:ml-64 mt-16'><Records /></div></> : <Navigate to='/login' />} />
        <Route path='/vitals' element={token ? <><DashboardSidebar /><DashboardNavbar /><div className='ml-14 md:ml-64 mt-16'><Vitals /></div></> : <Navigate to='/login' />} />

      </Routes>
    </>
  )
}

export default App