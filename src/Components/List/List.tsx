import React, { useState, useEffect } from "react";
import { Card } from "../Card/Card";
import "./List.css";
import { useNavigate } from "react-router";
import { deleteCustomList } from "../../apiCall";
import { useParams, useLocation } from "react-router-dom";

interface Attributes {
  season: string;
  clothing_type: string;
  size: string;
  color: string;
  image_url: string;
  notes: string;
  favorite: boolean;
}

interface Item {
  id: string;
  type: string;
  attributes: Attributes;
}

type IdParams = {
  id: string;
};

export const List: React.FC = () => {
  const [listDetails, setListDetails] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [change, setChange] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams<IdParams>();
  const location = useLocation();

  const fetchListDetails = async () => {
    try {
      const response = await fetch(
        `https://closet-manager-be.herokuapp.com/api/v1/users/1/lists/${id}/items`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch list details");
      }
      
      const data = await response.json();
      const items = data.data;
      setListDetails(items);
      setLoading(false)
    } catch (error) {
      setError("An error occurred while fetching the list details.");
    }
  };

  useEffect(() => {
    fetchListDetails();
  }, [change]);

  const handleBack = (): void => {
    navigate("/lists");
  };

  const handleDelete = async (itemId: string) => {
    try {
      const response = await fetch(
        `https://closet-manager-be.herokuapp.com/api/v1/items/${itemId}/lists/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setChange(!change);
    } catch (error) {
      setError("An error occurred while deleting the item.");
    }
  };

  const handleDeleteList = async (id: string) => {
   await deleteCustomList(id)
    navigate("/lists", {
      state: {deleted: true}
    })
  }

  return (
    <section className="list">
      <h2 className="list-title">{location.state.listName}</h2>
      <div className="list-buttons-container">
        {!loading && !listDetails.length && <p className="empty-list-text">You haven't added any items to this list.</p>}
      </div>
      {error && <h2>{error}</h2>}
      <div className="card-grid">
        {listDetails &&
          listDetails.map((item: Item, index: number) => (
            <div key={index} className="list-card">
              <div className="remove-from-list" onClick={() => handleDelete(item.id)}>
                <p className="remove-item-text">Remove Item</p>
                <i className="fa-thin fa-xmark"></i>
              </div>
              <Card id={item.id} image={item.attributes.image_url} setChange={setChange} />
            </div>
          ))}
      </div>
      <button className="delete-list-button" onClick={() => handleDeleteList(id!)}> Delete List</button>
    </section>
  );
};
