import '../App.css'
import CostDisplay from '../components/CostDisplay'
import AddCost from '../components/AddCost'
import { useState } from 'react'


export const Home = () => {
   const [addedCostId, setAddedCostId] = useState<string>("")

   return (
      <div className='layout'>
        <CostDisplay reloadNeed={addedCostId} />
        <AddCost onAdd={setAddedCostId}/>
      </div>
   )
}