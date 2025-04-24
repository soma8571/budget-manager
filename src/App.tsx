import './App.css'
import CostDisplay from './components/CostDisplay'
import AddCost from './components/AddCost'
import { useState } from 'react'


function App() {

  const [isRefreshNeed, setIsRefreshNeed] = useState<boolean>(false)

  return (
    <div className='layout'>
      <CostDisplay />
      <AddCost />
    </div>
  )
}

export default App
