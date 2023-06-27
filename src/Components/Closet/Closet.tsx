import { Card } from "../Card/Card";
import "./Closet.css";
import { useState, useEffect } from "react";
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
  const [change, setChange] = useState<boolean>(false);
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
          favorite={item.attributes.favorite}
          setChange={setChange}
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

  useEffect(() => {
    handleFilter()
  }, [color, season, type, favorites])


  return (
    <div className="closet-container">
      <div className="item-type-container">
        <button className="item-type-button item-type-spacer">All Items</button>
        <button className="item-type-button" onClick={((event) => setType("tops"))}>Tops</button>
        <button className="item-type-button" onClick={((event) => setType("bottoms"))}>Bottoms</button>
        <button className="item-type-button" onClick={((event) => setType("shoes"))}>Shoes</button>
        <button className="item-type-button" onClick={((event) => setType("accessories"))}>Accessories</button>
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
              <input type="radio" id="Red" name="color" value="red" onChange={((event) => setColor(event.target.value))} />
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Blue">Blue</label>
              <input type="radio" id="Blue" name="color" value="blue" onChange={((event) => setColor(event.target.value))}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Green">Green</label>
              <input type="radio" id="Green" name="color" value="green" onChange={((event) => setColor(event.target.value))}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Purple">Purple</label>
              <input type="radio" id="Purple" name="color" value="purple" onChange={((event) => setColor(event.target.value))}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Orange">Orange</label>
              <input type="radio" id="Orange" name="color" value="orange" onChange={((event) => setColor(event.target.value))}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Yellow">Yellow</label>
              <input type="radio" id="Yellow" name="color" value="yellow" onChange={((event) => setColor(event.target.value))}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Black">Black</label>
              <input type="radio" id="Black" name="color" value="black" onChange={((event) => setColor(event.target.value))}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="White">White</label>
              <input type="radio" id="White" name="color" value="white" onChange={((event) => setColor(event.target.value))}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Multi">Multi</label>
              <input type="radio" id="Multi" name="color" value="multi" onChange={((event) => setColor(event.target.value))}/>
          </div>
          <div className="filter-label-and-input">
              <label htmlFor="All">Show All</label>
              <input type="radio" id="All" name="color" value="" onChange={((event) => setColor(event.target.value))}/>
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
              <input type="radio" id="Fall" name="season" value="fall" onChange={((event) => setSeason(event.target.value))}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Winter">Winter</label>
              <input type="radio" id="Winter" name="season" value="winter" onChange={((event) => setSeason(event.target.value))}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Spring">Spring</label>
              <input type="radio" id="Spring" name="season" value="spring" onChange={((event) => setSeason(event.target.value))}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Summer">Summer</label>
              <input type="radio" id="Summer" name="season" value="summer" onChange={((event) => setSeason(event.target.value))}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="All-Seasons">All Seasons</label>
              <input type="radio" id="Summer" name="season" value="" onChange={((event) => setSeason(event.target.value))}/>
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
              <input type="radio" id="Favorites" name="Favorites" value="true" onChange={((event) => setFavorites(true))}/>
            </div>
            <div className="filter-label-and-input">
              <label htmlFor="Favorites">Show All</label>
              <input type="radio" id="Favorites" name="Favorites" value="" onChange={((event) => setFavorites(false))}/>
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
    </div>
  );
};
