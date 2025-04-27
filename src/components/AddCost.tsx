import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Cost } from "../models/cost.model";
import { Category } from "../models/category.model";
import { getTodayDate } from "../common/utils";

interface AddCostProp {
  onAdd: (text: string) => void
}

const AddCost: React.FC<AddCostProp> = ({onAdd}) => {

  const emptyCost: Cost = {
    cost_amount: 0,
    cost_name: "",
    cost_date: getTodayDate(),
    category: 0,
  };
  const [newCost, setNewCost] = useState<Cost>(emptyCost);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, SetError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveResult, setSaveResult] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const url = `${import.meta.env.VITE_API_URL}/getCategories`;
      try {
        const { data } = await axios.get(url);
        if (Array.isArray(data) && data.length > 0) {
          //console.log(data)
          setCategories(data);
        } else {
          SetError("Még nincsenek kategóriák.");
        }
      } catch (err) {
        SetError("Hiba a kategóriák lekérése során.");
      }
    }
    fetchCategories();
  }, []);

  const saveCost = async () => {
    setLoading(true);
    const url = `${import.meta.env.VITE_API_URL}/saveNewCost`;
    try {
      const response = await axios.post(url, newCost);
      console.log(response);
      if (response.status === 201) {
        setSaveResult("A költség sikeresen mentve.");
        setNewCost(emptyCost);
        onAdd(response.data.cost_id)
      }
    } catch (err) {
      console.log(err);
      SetError("Hiba." + err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name + " " + value);

    const temp = { ...newCost, [name]: value };
    setNewCost(temp);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newCost);
    saveCost();
  };

  return (
    <div className="addCostCompWrapper">
      <div className="addCostWrapper">
        <div className="compTitle">Költség hozzáadása</div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="addCostInputFields">
            <div className="formField">
              <label htmlFor="cost_name">Megnevezés</label>
              <input
                type="text"
                name="cost_name"
                id="cost_name"
                onChange={handleChange}
                value={newCost?.cost_name}
                required
              />
            </div>

            <div className="formField">
              <label htmlFor="cost_amount">Összeg</label>
              <input
                type="number"
                name="cost_amount"
                id="cost_amount"
                onChange={handleChange}
                value={newCost?.cost_amount}
                required
              />
            </div>

            <div className="formField">
              <label htmlFor="cost_date">Dátum</label>
              <input
                type="date"
                name="cost_date"
                id="cost_date"
                onChange={handleChange}
                value={newCost?.cost_date}
                required
              />
            </div>

            {error === "" ? (
              <div className="formField">
                <label htmlFor="category">Kategória</label>
                <select
                  name="category"
                  id="category"
                  onChange={handleChange}
                  value={newCost?.category}
                  required
                >
                  <option value="">Kérlek válassz</option>
                  {categories.map((cat, ind) => (
                    <option key={ind} value={cat.id_category}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="errormsg">{error}</div>
            )}

            <input
              type="submit"
              value="Mentés"
              disabled={error !== "" || loading}
            />
          </div>
        </form>
      </div>

      <div className="saveResult">{saveResult}</div>
    </div>
  );
}

export default AddCost;
