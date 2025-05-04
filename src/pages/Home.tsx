import { useState, useContext } from 'react'
import { ThemeContext } from '../App'
import '../App.css'
import CostDisplay from '../components/CostDisplay'
import AddCost from '../components/AddCost'
import Header from '../components/Header'
import Footer from '../components/Footer'


export const Home = () => {

   const [addedCostId, setAddedCostId] = useState<string>("")

   const { isDarkMode } = useContext(ThemeContext)

   return (
      <div className='layout'>
         <Header />
         <main className={isDarkMode ? "dark-theme" : "light"}>
            <CostDisplay reloadNeed={addedCostId} />
            <AddCost onAdd={setAddedCostId}/>
         </main>
         <Footer />
      </div>
   )
}