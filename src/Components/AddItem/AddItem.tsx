import React, { useState, useEffect, useRef } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import './AddItem.css';
import { createItem } from '../../apiCall';
import GridLoader from "react-spinners/GridLoader";

export const AddItem: React.FC = (): JSX.Element => {

  const navigate = useNavigate();
  const [image, setImage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [itemId, setItemId] = useState<number | undefined>();
  const [successfulPost, setSuccessfulPost] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
    if (successfulPost) {
      navigate(`/itemDetails/${itemId}`)
    }
    if (error) {
      navigate('/item-not-found')
    }
  }, [successfulPost, error]);

  const handleSubmit = ({target}: FormEvent<HTMLFormElement> ) => {
    setLoading(true)
    const formData = new FormData(target as HTMLFormElement)
    createItem(formData)
      .then(data => {
        setItemId(data.data.id)
        setSuccessfulPost(true)
        setImage("")
        if (imageInputRef.current) {
          imageInputRef.current.value = ""
        }
        })
      .catch(err => setError(err))
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void =>{
    if (target.files) {
      setImage(URL.createObjectURL(target.files[0]));
    }
  }
  
  return (
    <>
    {loading && <p className="uploading-text">Uploading...</p>}
    {loading && (
        <div className="add-item-spinner">
          <GridLoader
            color="#c8b6ff"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    {!loading && <div className="form-container">
      <div className='text-container'> 
      </div>
      <form className="form" id="form" onSubmit={(e => {e.preventDefault(); handleSubmit(e);})}>
        {image && <img src={image} alt="" className='image-preview'/>}
        <label htmlFor="image" className="upload-container">
          Upload Picture of Item
          <input 
            className='img-input'
            accept="image/*,capture=camera"
            type="file"
            name="image"
            required
            onChange={handleChange}
            ref={imageInputRef}
          />
        </label>
        <span>Type</span>
        <select  className="dropdown" name="clothing_type" required>
          <option value="other" hidden>Clothing Type</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="outerwear">Outerwear</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
          <option value="other">Other</option>
        </select>
        <span>Color</span>
        <select className="dropdown" name="color">
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
        <span>Season</span>
        <select className="dropdown" name="season">
          <option value="all_season" hidden>Season</option>
          <option value="all_season">All Seasons</option>
          <option value="fall">Fall</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
        </select>
        <span>Size</span>
        <input type="text" name="size" className="size-input" />
        <span>Notes</span>
        <input className="add-item-notes-box" type="text" name="notes" />
        <button type="submit" value="Submit" className="add-item-button">Add Item</button>
      </form>
    </div>}
    </>
  );
};