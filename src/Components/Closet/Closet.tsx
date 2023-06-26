import { Card } from "../Card/Card";
import "./Closet.css";
import { useState, useEffect } from "react";
import { filterItems, getAllItems } from "../../apiCall";
import GridLoader from "react-spinners/GridLoader";
// import Glide from '@glidejs/glide';

interface attributes {
  season: string;
  clothing_type: string;
  size: string;
  color: string;
  image_url: string;
  notes: string;
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
  const [change, setChange] = useState<boolean>(false);
  const [colorOptionsVisible, setColorOptionsVisible] = useState<boolean>(false);
  const [seasonOptionsVisible, setSeasonOptionsVisible] = useState<boolean>(false);
  const [favoriteOptionsVisible, setFavoriteOptionsVisible] = useState<boolean>(false);


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
  }, [change]);
 

  const mappedItems = filteredItems.map((item: Item): JSX.Element => {
    return (
        <Card
          key={item.id}
          id={item.id}
          color={item.attributes.color}
          type={item.attributes.clothing_type}
          size={item.attributes.size}
          image={item.attributes.image_url}
          setChange={setChange}
        />
    );
  });



  const handleFilter = async (): Promise<void> => {
    const clothing_type = document.querySelector<HTMLSelectElement>("#filter--clothing-type")!;
    const color = document.querySelector<HTMLSelectElement>("#filter--color")!;
    const season = document.querySelector<HTMLSelectElement>("#filter--season")!;
    const favorite = document.querySelector<HTMLSelectElement>("#filter--favorite")!;

    const queries = [
      { name: "season", value: season.value },
      { name: "clothing_type", value: clothing_type.value },
      { name: "color", value: color.value },
      { name: "favorite", value: favorite.value},
      
    ];
    const truthyQueries = queries.filter(({ value }) => value);
    const queriesString = truthyQueries
      .map(({ name, value }) => `${name}=${value}`)
      .join("&");

    const url = `https://closet-manager-be.herokuapp.com/api/v1/users/1/items/find_all?${queriesString}`;
    setLoading(true);
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

  const toggleColorOptions = () => {
    setColorOptionsVisible(!colorOptionsVisible)
  }

  const toggleSeasonOptions = () => {
    setSeasonOptionsVisible(!seasonOptionsVisible)
  }

  const toggleFavoriteOptions = () => {
    setFavoriteOptionsVisible(!favoriteOptionsVisible)
  }

  return (
    <div className="closet-container">
      <div className="item-type-container">
        <button className="item-type-button item-type-spacer">All Items</button>
        <button className="item-type-button">Tops</button>
        <button className="item-type-button">Bottoms</button>
        <button className="item-type-button">Shoes</button>
        <button className="item-type-button">Accessories</button>
      </div>
      <section className="closet-main">
        <div className="filter-options-container">
          <div className="filter-icon-container">
            <button className="filter-option" onClick={(() => toggleColorOptions())}>Color
            </button>
            {!colorOptionsVisible && <i className="fa-thin fa-plus expand-icon"></i>}
            {colorOptionsVisible && <i className="fa-thin fa-minus minimize-icon"></i>}
          </div>
          {colorOptionsVisible && <section className="color-options">
            <div className="filter-label-and-input">
              <label htmlFor="Red">Red</label>
              <input type="checkbox" id="Red" name="Red" value="Red"/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Blue">Blue</label>
              <input type="checkbox" id="Blue" name="Blue" value="Blue"/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Green">Green</label>
              <input type="checkbox" id="Green" name="Green" value="Green"/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Purple">Purple</label>
              <input type="checkbox" id="Purple" name="Purple" value="Purple"/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Orange">Orange</label>
              <input type="checkbox" id="Orange" name="Orange" value="Orange"/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Yellow">Yellow</label>
              <input type="checkbox" id="Yellow" name="Yellow" value="Yellow"/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Black">Black</label>
              <input type="checkbox" id="Black" name="Black" value="Black"/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="White">White</label>
              <input type="checkbox" id="White" name="White" value="White"/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Multi">Multi</label>
              <input type="checkbox" id="Multi" name="Multi" value="Multi"/>
          </div>
        </section>}
        <div className="filter-icon-container">
            <button className="filter-option" onClick={(() => toggleSeasonOptions())}>Season
            </button>
            {!seasonOptionsVisible && <i className="fa-thin fa-plus expand-icon"></i>}
            {seasonOptionsVisible && <i className="fa-thin fa-minus minimize-icon"></i>}
          </div>
          {seasonOptionsVisible && <section className="season-options">
            <div className="filter-label-and-input">
              <label htmlFor="Fall">Fall</label>
              <input type="checkbox" id="Fall" name="Fall" value="Fall"/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Winter">Winter</label>
              <input type="checkbox" id="Winter" name="Winter" value="Winter"/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Spring">Spring</label>
              <input type="checkbox" id="Spring" name="Spring" value="Spring"/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Summer">Summer</label>
              <input type="checkbox" id="Summer" name="Summer" value="Summer"/>
            </div>
          </section>}
           <div className="filter-icon-container">
            <button className="filter-option" onClick={(() => toggleFavoriteOptions())}>Favorites
            </button>
            {!favoriteOptionsVisible && <i className="fa-thin fa-plus expand-icon"></i>}
            {favoriteOptionsVisible && <i className="fa-thin fa-minus minimize-icon"></i>}
          </div>
          {favoriteOptionsVisible && <section className="favorite-options">
            <div className="filter-label-and-input">
              <label htmlFor="Favorites">Only Favorites</label>
              <input type="checkbox" id="Favorites" name="Favorites" value="Favorites"/>
            </div>
          </section>}
        </div>
        <div className="cards-container">{mappedItems}</div>
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
      {!filteredItems.length && !loading && <p className="error-text">No Items Found</p>}
      {/* <div className="cards-container">{mappedItems}</div> */}
    </div>
  );
};
