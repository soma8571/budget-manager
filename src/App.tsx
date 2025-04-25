import './App.css'
import CostDisplay from './components/CostDisplay'
import AddCost from './components/AddCost'
import { useState } from 'react'


function App() {

  const [isRefreshNeed, setIsRefreshNeed] = useState<string>("")

  return (
    <div className='layout'>
      <CostDisplay />
      <AddCost onAdd={setIsRefreshNeed}/>
    </div>
  )
}

export default App
