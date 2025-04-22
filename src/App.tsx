import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { Cost } from './models/cost.model'

function App() {

  const [costs, setCosts] = useState<Cost[]>([])
  const [error, SetError] = useState('')

  useEffect(()=> {
    async function fetchData() {
      const url = "http://localhost:3000/getallcosts"
      try {
        const response = await axios.post(
          url, 
          //{dateFrom: "2025-04-14"}
        )
        const data = response.data
        if (Array.isArray(data) && data.length > 0) {
          setCosts(data)
        } else {
          SetError('Még nincsenek költségek')
        }
      } catch(err) {
        console.log(err)
        SetError('A költségek lekérése jelenleg nem elérhető.')
      }
    }
    fetchData()
  }, [])

  useEffect(()=> {
    console.log(costs)
  }, [costs])

  return (
    <>
      <div>
        {costs && costs.length > 0 ?
          <div>
            {costs.map(cost => <li>{cost.cost_name}</li>)}
          </div>
          :
          error === "" && <div>{error}</div> 
        }
      </div>
    </>
  )
}

export default App
