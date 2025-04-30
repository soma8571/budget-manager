import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { Home } from './pages/Home'

function App() {

  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
