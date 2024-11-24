import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Studentform from './pages/Studentform'
import AllData from './pages/AllData'

const App = () => {
  return (
    // <div className='text-red-600'>App</div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Studentform />} />
        <Route path='/allData' element={<AllData />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App