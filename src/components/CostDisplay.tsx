import React, {useState, useEffect, ReactNode} from 'react'
import axios from 'axios'
import { Cost } from '../models/cost.model'
import { getCurrentMonthStart, formatDate, currencyFormat } from '../common/utils'

const CostDisplay: React.FC = () => {

    const [costs, setCosts] = useState<Cost[]>([])
    const [error, SetError] = useState('')

    useEffect(()=> {
        async function fetchData() {
            const url = "http://localhost:3000/getallcosts"
            try {
                const response = await axios.post(
                    url, 
                    { dateFrom: getCurrentMonthStart() }
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
        console.log(getCurrentMonthStart())
    }, [])

    useEffect(()=> {
        console.log(costs)
    }, [costs])

    const renderSummaryRow = (): ReactNode => {
        const totalCost = costs
            .map(cost => cost.cost_amount)
            .reduce((total, cost_amount) => total + cost_amount, 0)
        return (
            <div className='summaryRow'>Összesen {costs.length} tétel <span className='totalCost'>{currencyFormat(totalCost)}</span> értékben</div>
        )
    }

    const renderCostTableHeader = (): ReactNode => {
        const header = <thead>
            <tr>
                <th>Dátum</th>
                <th>Megnevezés</th>
                <th>Összeg</th>
                <th>Kategória</th>
            </tr>
        </thead>
        return header
    }

    const renderCosts = (): ReactNode => {
        const rows = costs.map((cost, ind)=>
            <tr key={ind}>
                <td>{formatDate(cost.cost_date)}</td>
                <td>{cost.cost_name}</td>
                <td style={{textAlign: "right"}}>{currencyFormat(cost.cost_amount)}</td>
                <td>{cost.category_name}</td>
            </tr>
        )
        return (<table className='costs'>
            {renderCostTableHeader()}
            <tbody>
                {rows}
            </tbody>
        </table>)
    }


    return (
        <div>
        {costs && costs.length > 0 ?
            <div className='costsWrapper'>
                <div className='costsTableWrapper'>
                    {renderCosts()}
                </div>
                <div>
                    {renderSummaryRow()}
                </div>
            </div>
          :
          error === "" && <div>{error}</div>
        }
      </div>
    )
}

export default CostDisplay
