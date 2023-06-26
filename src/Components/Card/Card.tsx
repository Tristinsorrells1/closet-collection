import { useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { deleteItem } from "../../apiCall";
import "./Card.css";
import GridLoader from "react-spinners/GridLoader";

interface CardProps {
  id: string;
  size: string;
  image: string;
  color: string;
  type: string;
  setChange: Dispatch<SetStateAction<boolean>>;
}

export const Card = ({ id, image, setChange, size, color, type }: CardProps): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onLoad = (): void => setLoaded(true);

  const handleDeleteButton = (id: string) => {
    setChange(true)
    return deleteItem(id)
      .then((data) => {
        console.log(data)
        setChange(false)
      })
      .catch((err) => setError(err))
  };

  return (
    <div key={id} className="card-container">
      <Link to={`/itemDetails/${id}`}>
        <img
          onLoad={onLoad}
          src={image}
          alt="Image of clothing item"
          className="card-image"
        />
        {!loaded && (
          <div className="loader">
            <GridLoader
              color="#c8b6ff"
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {error && <p>Could not delete item. Please try again later.</p>}
      </Link>
      {/* <div className="banner-container">
        <p onClick={() => handleDeleteButton(id)} className="delete-banner">
          <i className="fa-light fa-trash-can"></i> Delete
        </p>
      </div> */}
      <div className="card-details">
        {color && <p> {color.toUpperCase()}</p>}
        {type && type !== "Unspecified" && <p> {type.toUpperCase()}</p>}
        {size && <p> {size.toUpperCase()} </p>}
      </div>
    </div>
  );
};
