import "./Details.css";
import { useEffect, useState} from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getSingleItem, deleteItem } from "../../apiCall";
import { singleItemCleaning } from "../../util";
// @ts-ignore
import { Calendar} from "../Calendar/Calendar";

interface Attributes {
  season: string;
  clothing_type: string;
  size: string;
  color: string | undefined;
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

interface List {
  id: string;
  name: string;
}

export const Details = (): JSX.Element => {
  const { id } = useParams<IdParams>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | undefined>();
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [toggleCal, setToggleCal] = useState<boolean>(false);
  const [toggleList, setToggleList] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [lists, setLists] = useState<List[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedList, setSelectedList] = useState<string | any>("")


  const fetchLists = async () => {
    try {
      const response = await fetch(
        "https://closet-manager-be.herokuapp.com/api/v1/users/1/lists"
      );
      const data = await response.json();
      const listDetails = data.data.map((list: any) => ({
        id: parseInt(list.id),
        name: list.attributes.name,
        items: list.attributes.items,
      }));
      setLists(listDetails);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching the lists.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleItem(id!);
        setItem(singleItemCleaning(response.data));
        setFetchError(false);
        setLoading(false);
      } catch (error) {
        setFetchError(true);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (fetchError) {
      navigate("/item-not-found");
    }
    if (isDeleted) {
      setItem(undefined);
      setTimeout(() => {
        navigate("/myCloset");
      }, 3500);
    }
  }, [fetchError, isDeleted]);

  const handleDelete = (id: string) => {
    deleteItem(id)
      .then(() => {
        setIsDeleted(true);
      })
      .catch(() => {
        setFetchError(true);
      });
  };

  const handleAddToList = async () => {
   
    setToggleList(false)
    console.log(selectedList)
    const listId = parseInt(selectedList);
    if (!listId) {
      return;
    }
   
    try {
      const response = await fetch(
        `https://closet-manager-be.herokuapp.com/api/v1/items/${id}/lists/${listId}/list_items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: {
              id: parseInt(id!),
            },
          }),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }

    } catch (error) {
      console.error(error);
      setError("An error occurred while adding to lists.");
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);


  const handleFavoriteIcon = async () => {
    try {
      const res = await fetch(`https://closet-manager-be.herokuapp.com/api/v1/users/1/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: {
            favorite: !item?.attributes.favorite
          }
        })
      })
      if (!res.ok) {
        throw new Error("Could not update item.")
      } else {
        const data = await res.json();
        setItem(data.data);
      }
      console.log("UPDATED ITEM")
    } catch (err) {
      console.log(err)
      setError("Failed to update favorite for item.")
    }
  }
  return (
    <section className="details-section">
      {loading && <p>Loading...</p>}
      {isDeleted && (
        <>
          <p>This item has been removed from your closet.</p>
          <p>Redirecting ...</p>
        </>
      )}
      {item && (
        <div className="image-and-favorite-container">
          <div className="item-favorite-background">
            {!item.attributes.favorite &&
            <i className="fa-thin fa-heart" onClick={(() => handleFavoriteIcon())}></i>}
            {item.attributes.favorite &&
            <i className="fa-solid fa-heart" onClick={(() => handleFavoriteIcon())}></i>}
          </div>
          <img
            className="item-details-image"
            src={item.attributes.image_url}
            alt="Image of clothing item"
          />
        </div>
        
      )}
      <div className="toggle-icons">
        <i className="fa-duotone fa-calendar-days toggle-icon" onClick={(() => setToggleCal(!toggleCal))}></i>
        <i className="fa-light fa-list toggle-icon" onClick={(() => setToggleList(!toggleList))}></i>
      </div>
      {toggleCal && <Calendar id={id} />}
          {toggleList &&  <div className="add-to-list-container">
              <form id="lists" name="lists" onSubmit={handleAddToList}></form>
              <label htmlFor="lists">Select a List:</label>
              {lists.map((list) => (
                <div className="list-input-container" key={list.id}>
                 <label htmlFor="list">{list.name}</label>
                  <input type="radio" onChange={(() => setSelectedList(list.id))} id={list.id} name="list" key={list.id} ></input>
                </div>
              ))}
            <button onClick={handleAddToList} type="submit">Add to List</button>
          </div> }
      {item && item.attributes.notes && (
        <div className="notes-container">
          <h2 className="item-notes-header">Notes</h2>
          <p className="item-notes">{item.attributes.notes}</p>
        </div>
      )}
      {!loading && !isDeleted && (
        <section className="details-button-container"> 
          <div className="edit-delete-container">
            <NavLink to={`/edit/${id}`} className="edit-link">
              <button className="details-edit-button">Edit</button>
            </NavLink>
            <button
              className="details-delete-button"
              onClick={() => handleDelete(id!)}
            >
              Delete
            </button>
          </div>
        </section>
      )}
       {item && (
        <div className="item-details-container">
          {item.attributes.color && (
            <NavLink to={`/edit/${id}`} className="item-link">
              <p className="item-details">{item.attributes.color}</p>
            </NavLink>
          )}
          <NavLink to={`/edit/${id}`} className="item-link">
            <p className="item-details">{item.attributes.season}</p>
          </NavLink>
          {item.attributes.clothing_type && (
            <NavLink to={`/edit/${id}`} className="item-link">
              <p className="item-details">{item.attributes.clothing_type}</p>
            </NavLink>
          )}
          {item.attributes.size && (
            <NavLink className="item-link" to={`/edit/${id}`}>
              <p className="item-details">{`size ${item.attributes.size}`}</p>
            </NavLink>
          )}
        </div>
      )}
    </section>
  );
};