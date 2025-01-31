import React from 'react'
import Navbar from './components/Navbar/Navbar'
import SideBar from './components/Sidebar/SideBar'

import { Routes, Route } from 'react-router-dom'

import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Order/Order'


const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
