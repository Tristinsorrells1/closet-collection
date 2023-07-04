import { Card } from "../Card/Card";
import "./Closet.css";
import { useState, useEffect, useLayoutEffect } from "react";
import { filterItems, getAllItems } from "../../apiCall";
import GridLoader from "react-spinners/GridLoader";

interface attributes {
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
  attributes: attributes;
}

export const Closet = (): JSX.Element => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [colorOptionsVisible, setColorOptionsVisible] = useState<boolean>(false);
  const [seasonOptionsVisible, setSeasonOptionsVisible] = useState<boolean>(false);
  const [favoriteOptionsVisible, setFavoriteOptionsVisible] = useState<boolean>(false);
  const [color, setColor] = useState<string>("")
  const [season, setSeason] = useState<string>("")
   const [type, setType] = useState<string>("")
  const [favorites, setFavorites] = useState<boolean>(false);


  useEffect(() => {
    getAllItems()
      .then((response) => {
        setAllItems(response.data);
        setFilteredItems(response.data);
        setFetchError(false);
        setLoading(false);
      })
      .catch((Error) => {
        console.error("All Items Fetch Error");
        setFetchError(true);
        setAllItems([]);
        setFilteredItems([]);
        setLoading(false);
      });
  }, []);
 
  
  const mappedItems = filteredItems.map((item: Item): JSX.Element => {
    return (
        <Card
          key={item.id}
          id={item.id}
          color={item.attributes.color}
          type={item.attributes.clothing_type}
          size={item.attributes.size}
          image={item.attributes.image_url}
          favorite={item.attributes.favorite}
        />
    );
  });

  const handleFilter = async (): Promise<void> => {
    const queries = [
      { name: "season", value: season},
      { name: "clothing_type", value: type },
      { name: "color", value: color},
      { name: "favorite", value: favorites},
    ];

    const truthyQueries = queries.filter(({ value }) => value);
    
    const queriesString = truthyQueries
      .map(({ name, value }) => `${name}=${value}`)
      .join("&");

    const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items/find_all?${queriesString}`;
    filterItems(url)
      .then((response) => {
        setFilteredItems(response.data);
        setFetchError(false);
      })
      .catch((Error) => {
        console.error("Filter Fetch Error");
        setFetchError(true);
        setFilteredItems([]);
      });
    setLoading(false);
  };

  useLayoutEffect(() => {
    setLoading(true)
    handleFilter()
  }, [color, season, type, favorites])


  return (
    <div className="closet-container">
      <div className="item-type-container">
        <button className="item-type-button item-type-spacer" onClick={(() => setType(""))}>All Items</button>
        <button className="item-type-button" onClick={(() => setType("tops"))}>Tops</button>
        <button className="item-type-button" onClick={(() => setType("bottoms"))}>Bottoms</button>
        <button className="item-type-button" onClick={(() => setType("shoes"))}>Shoes</button>
        <button className="item-type-button" onClick={(() => setType("accessories"))}>Accessories</button>
      </div>
      {filteredItems.length !==0 && !fetchError && <p className="item-count-text"> {filteredItems.length} Items</p>}
      <section className="closet-main">
        <div className="filter-options-container">
          <div className="filter-icon-container">
            <button className="filter-option" onClick={(() => setColorOptionsVisible(!colorOptionsVisible))}>Color
            </button>
            {!colorOptionsVisible && <i className="fa-thin fa-plus expand-icon"></i>}
            {colorOptionsVisible && <i className="fa-thin fa-minus minimize-icon"></i>}
          </div>
          {colorOptionsVisible && <section className="color-options">
            <div className="filter-label-and-input">
              <label htmlFor="Red">Red</label>
              <input type="radio" id="Red" name="color" value="red" checked={(color === "red")} onChange={((event) => {
                setColor(event.target.value) 
                setColorOptionsVisible(false)})} />
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Blue">Blue</label>
              <input type="radio" id="Blue" name="color" value="blue" checked={(color === "blue")} onChange={((event) => {
                setColor(event.target.value) 
                setColorOptionsVisible(false)})} />
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Green">Green</label>
              <input type="radio" id="Green" name="color" value="green" checked={(color === "green")} onChange={((event) => {
                setColor(event.target.value) 
                setColorOptionsVisible(false)})} />
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Purple">Purple</label>
              <input type="radio" id="Purple" name="color" value="purple" checked={(color === "purple")} onChange={((event) => {
                setColor(event.target.value) 
                setColorOptionsVisible(false)})} />
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Orange">Orange</label>
              <input type="radio" id="Orange" name="color" value="orange" checked={(color === "orange")} onChange={((event) => {
                setColor(event.target.value) 
                setColorOptionsVisible(false)})} />
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Yellow">Yellow</label>
              <input type="radio" id="Yellow" name="color" value="yellow" checked={(color === "yellow")} onChange={((event) => {
                setColor(event.target.value) 
                setColorOptionsVisible(false)})} />
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Black">Black</label>
              <input type="radio" id="Black" name="color" value="black" checked={(color === "black")} onChange={((event) => {
                setColor(event.target.value) 
                setColorOptionsVisible(false)})} />
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="White">White</label>
              <input type="radio" id="White" name="color" value="white" checked={(color === "white")} onChange={((event) => {
                setColor(event.target.value) 
                setColorOptionsVisible(false)})} />
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Multi">Multi</label>
              <input type="radio" id="Multi" name="color" value="multi" checked={(color === "multi")} onChange={((event) => {
                setColor(event.target.value) 
                setColorOptionsVisible(false)})} />
          </div>
          <div className="filter-label-and-input">
              <label htmlFor="All">Show All</label>
              <input type="radio" id="All" name="color" value="" checked={(color === "")} onChange={((event) => {
                setColor(event.target.value) 
                setColorOptionsVisible(false)})} />
          </div>
        </section>}
        <div className="filter-icon-container">
            <button className="filter-option" onClick={(() => setSeasonOptionsVisible(!seasonOptionsVisible))}>Season
            </button>
            {!seasonOptionsVisible && <i className="fa-thin fa-plus expand-icon"></i>}
            {seasonOptionsVisible && <i className="fa-thin fa-minus minimize-icon"></i>}
          </div>
          {seasonOptionsVisible && <section className="season-options">
            <div className="filter-label-and-input">
              <label htmlFor="Fall">Fall</label>
              <input type="radio" id="Fall" name="season" value="fall" checked={(season === "fall")}  onChange={(() => {
              setSeason("fall")
              setSeasonOptionsVisible(!seasonOptionsVisible)})}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Winter">Winter</label>
              <input type="radio" id="Winter" name="season" value="winter" checked={(season === "winter")} onChange={(() => {
              setSeason("winter")
              setSeasonOptionsVisible(!seasonOptionsVisible)})}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Spring">Spring</label>
              <input type="radio" id="Spring" name="season" value="spring" checked={(season === "spring")} onChange={(() => {
              setSeason("spring")
              setSeasonOptionsVisible(!seasonOptionsVisible)})}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Summer">Summer</label>
              <input type="radio" id="Summer" name="season" value="summer" checked={(season === "summer")} onChange={(() => {
              setSeason("summer")
              setSeasonOptionsVisible(!seasonOptionsVisible)})}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="All-Seasons">All Seasons</label>
              <input type="radio" id="Summer" name="season" value="" checked={(season === "")} onChange={(() => {
              setSeason("")
              setSeasonOptionsVisible(!seasonOptionsVisible)})}/>
            </div>
          </section>}
           <div className="filter-icon-container">
            <button className="filter-option" onClick={(() => setFavoriteOptionsVisible(!favoriteOptionsVisible))}>Favorites
            </button>
            {!favoriteOptionsVisible && <i className="fa-thin fa-plus expand-icon"></i>}
            {favoriteOptionsVisible && <i className="fa-thin fa-minus minimize-icon"></i>}
          </div>
          {favoriteOptionsVisible && <section className="favorite-options">
            <div className="filter-label-and-input">
              <label htmlFor="Favorites">Only Favorites</label>
              <input type="radio" id="Favorites" name="Favorites" value="true" checked={favorites} onChange={(() => {
                setFavoriteOptionsVisible(false)
                setFavorites(true)})}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Favorites">Show All</label>
              <input type="radio" id="Favorites" name="Favorites" value="" checked={!favorites} onChange={(() => {
                setFavoriteOptionsVisible(false)
                setFavorites(false)})}/>
            </div>
          </section>}
            <button className="clear-filters-button" onClick={(() => {
                setColor("")
                setType("")
                setSeason("")
                setFavorites(false)})}>Clear Filters</button>
        </div>
        <div className="cards-container">
          {filteredItems.length ===0 && !fetchError && <p className="no-item-text"> {filteredItems.length} Items</p>}
          {mappedItems}
        </div>
      </section>
      {loading && (
        <div className="closet-loader">
          <GridLoader
            color="#c8b6ff"
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {fetchError && (
        <p className="fetch-error-text">
          Unable to get items. Please try again later."
        </p>
      )}
    </div>
  );
};
