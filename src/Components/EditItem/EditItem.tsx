import type { FormEvent } from 'react';
import { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditItem.css";
import { getSingleItem, editItem } from "../../apiCall";

interface attributes {
  [key: string]: string;
  season: string; 
  clothing_type: string;
  size: string;
  color: string;
  notes: string;
}

interface Item {
  id: number;
  type: string;
  attributes: attributes;
}

export const EditItem: React.FC = (): JSX.Element => {
  const params = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | undefined>();
  const [fetchError, setFetchError] = useState<boolean>(false); 
  const [itemUpdated, setItemUpdated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  
  const itemType: HTMLInputElement | null = document.querySelector("#itemType");
  const itemColor: HTMLInputElement | null = document.querySelector("#itemColor");
  const itemSeason: HTMLInputElement | null = document.querySelector("#itemSeason");
  const itemSize: HTMLInputElement | null = document.querySelector("#itemSize");
  const itemNotes: HTMLInputElement | null = document.querySelector("#itemNotes");
  
  useEffect(() => {
   getSingleItem(params.id!)
   .then((response) => {
        setItem(response.data)
        setFetchError(false)
        setLoading(false)
      })
      .catch(()  => {
        setFetchError(true)
      })
  }, []);

   useEffect(() => {
    if (itemUpdated) {
      navigate(`/itemDetails/${params.id}`)
    }
    if (fetchError) {
      navigate('/item-not-found')
    }
  }, [itemUpdated, fetchError]);

  useEffect(() => {
    if (item) {
      const itemDetails: attributes = item.attributes;
      const inputs = {
        'clothing_type': itemType,
        'color': itemColor,
        'season': itemSeason,
        'size': itemSize,
        'notes': itemNotes
      };

    for (const [key, input] of Object.entries(inputs)) {
      if (itemDetails[key]) {
        input!.value = itemDetails[key];
      }
    }
  }
  }, [item]);

  const handleSubmit = ({target}: FormEvent<HTMLFormElement>) => {
    const itemInfo = {data: {item: { season: itemSeason!.value, color: itemColor!.value, clothing_type: itemType!.value, size: itemSize!.value, notes: itemNotes!.value}}}
    editItem(itemInfo, item!.id)
    .then((response) => {
      if (response.ok) {
        setItemUpdated(true)
      }
      else {
        setFetchError(true)
      }
      })
      .catch(()  => {
        setFetchError(true)
      })
  }

  return (
    <div className="edit-form-container">
      {loading && <p>Loading...</p>}
      <form className="edit-form" onSubmit={(e => {e.preventDefault(); handleSubmit(e)})}>
        <select  className="dropdown" id="itemType" name="clothing_type" required>
          <option value="other" hidden>Clothing Type</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="outerwear">Outerwear</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
          <option value="other">Other</option>
        </select>
        <select className="dropdown" id="itemColor" name="color">
          <option value="unspecified">Color</option>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="neutral">Neutral</option>
          <option value="multi">Multi</option>
        </select>
        <select className="dropdown" id="itemSeason" name="season">
          <option value="all_season" hidden>Season</option>
          <option value="all_season">All Seasons</option>
          <option value="fall">Fall</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
        </select>
        <label htmlFor="size" className="size-input">
          Size
          <input className="size-box" id="itemSize" type="text" name="size" />
        </label>
        <label htmlFor="notes" className="notes-input">
          Notes
          <input className="notes-box" id="itemNotes"
            type="text" name="notes" />
        </label>
        <button type="submit" value="Submit" className="form-button-add">Save</button>
        </form>
    </div>
  );
};