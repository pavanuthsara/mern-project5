import React from 'react'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </>
  )
}

export default App;
