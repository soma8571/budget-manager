import React, { useState, useEffect, useContext, ReactNode, ChangeEvent } from "react";
import { ThemeContext } from "../App";
import axios from "axios";
import { Cost } from "../models/cost.model";
import {
  getCurrentMonth,
  formatDate,
  currencyFormat,
} from "../common/utils";
import delete_icon from "/delete_icon.png";

interface CostDisplayProp {
  reloadNeed: string;
}

const CostDisplay: React.FC<CostDisplayProp> = ({ reloadNeed }) => {
  const [costs, setCosts] = useState<Cost[]>([]);
  const [error, SetError] = useState("");
  const [actualPeriod, SetActualPeriod] = useState(getCurrentMonth());
  const [isPending, setIsPending] = useState(false)

  const { isDarkMode } = useContext(ThemeContext)

  useEffect(() => {
    fetchData();
    //console.log(getCurrentMonthStart());
    //console.log("reloadNeed: " + reloadNeed);
  }, [reloadNeed, actualPeriod]);

  useEffect(() => {
    console.log(costs);
  }, [costs]);

  async function fetchData() {
    const url = `${import.meta.env.VITE_API_URL}/getSpecifiedMonthCosts`;
    try {
      const response = await axios.post(url, {
        month: actualPeriod,
      });
      const data = response.data;
      if (Array.isArray(data)) {
        setCosts(data);
        if (data.length === 0)
          SetError("Még nincs az adott időszakra vonatkozó költség.")
      } else {
        SetError("Hiba a kérés során.");
      }
    } catch (err) {
      console.log(err);
      SetError("A költségek lekérése jelenleg nem elérhető.");
    }
  }

  const deleteCost = async (cost_id: number) => {
    const url = `${import.meta.env.VITE_API_URL}/deleteCost`;
    try {
      const { data } = await axios.delete(url, { data: { costId: cost_id } });
      console.log(data);
      fetchData();
    } catch (err) {
      alert("Hiba a törlés során.");
    }
  };

  const renderSummaryRow = (): ReactNode => {
    const totalCost = costs
      .map((cost) => cost.cost_amount)
      .reduce((total, cost_amount) => total + cost_amount, 0);
    return (
      <div className="summaryRow">
        Összesen {costs.length} tétel{" "}
        <span className="totalCost">{currencyFormat(totalCost)}</span> értékben
      </div>
    );
  };

  const renderCostTableHeader = (): ReactNode => {
    const header = (
      <thead>
        <tr>
          <th>Dátum</th>
          <th>Megnevezés</th>
          <th>Összeg</th>
          <th>Kategória</th>
          <th>Művelet</th>
        </tr>
      </thead>
    );
    return header;
  };

  //Költség törlése
  const handleDelete = (e: React.MouseEvent<HTMLImageElement>) => {
    const button = e.currentTarget;
    //alert(button.dataset.id)
    const stringId = button.dataset.id;

    if (stringId) {
      const numberId = Number(stringId);
      if (!isNaN(numberId)) {
        deleteCost(numberId);
      } else {
        console.warn("Az elem azonosítója érvénytelen.");
      }
    } else {
      console.warn("A kattintott elem nem tartalmaz azonosítót.");
    }
  };

  //Költségek táblázatos megjelenítését végzi
  const renderCosts = (): ReactNode => {
    const rows = costs.map((cost, ind) => (
      <tr key={ind}>
        <td>{formatDate(cost.cost_date)}</td>
        <td>{cost.cost_name}</td>
        <td style={{ textAlign: "right" }}>
          {currencyFormat(cost.cost_amount)}
        </td>
        <td>{cost.category_name}</td>
        <td>
          <img
            alt="törlés"
            src={delete_icon}
            onClick={handleDelete}
            data-id={cost.cost_id}
            style={{ cursor: "pointer" }}
          />
        </td>
      </tr>
    ));
    return (
      <table className={isDarkMode ? "costs dark-table" : "costs"}>
        {renderCostTableHeader()}
        <tbody>{rows}</tbody>
      </table>
    );
  };

  //a hónapkiválasztó változását kezeli
  const handePeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value)
    SetActualPeriod(e.target.value)
  }

  //A Beolvasás gombon (Google Sheet-ről) történő kattintást kezeli
  const readFromSheet = async () => {
    const url = `${import.meta.env.VITE_API_URL}/saveSheetData`
    const sheetName = actualPeriod.replace("-", ".") + "."
    setIsPending(true)
    setCosts([])
    try {
      const response = await axios.post(
        url,
        { sheetName }
      )
      console.log(response)
      fetchData()
    } catch (err) {
      console.log(err)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div>
      <div className="costsWrapper">
        <div className="periodSelector">
          <label htmlFor="period">Hónap kiválasztása</label>
          <input
            type="month"
            name="period"
            id="period"
            value={actualPeriod}
            onChange={handePeriodChange}
            className={isDarkMode ? "dark-inputs" : ""}
          />
        </div>
        <div className="readFromGSWrapper">
          <div className="readFromSheetText">
            {isPending ? "Beolvasás folyamatban..." : "Beolvasás Google Sheet-ről"}
          </div>
          <div>
            <button
              onClick={readFromSheet}
              disabled={isPending}
              className={isDarkMode ? "dark-btn" : ""}
            >Beolvasás
            </button>
          </div>
        </div>
        {costs && costs.length > 0 ? (
          <>
            <div className="costsTableWrapper">{renderCosts()}</div>
            <div>{renderSummaryRow()}</div>
          </>
        ) : (
          error !== "" && <div>{error}</div>
        )}
      </div>
    </div>
  );
};

export default CostDisplay;
