import React from "react";
import { useState } from "react";
import "./AddList.css";
import { postCustomList } from "../../apiCall";

interface Event {
  target: {
    value: string;
  };
}

export const AddList: React.FC = (): JSX.Element => {
  const [newCustomList, setNewCustomList] = useState<string>("");
  const [hasError, setHasError] = useState<string | null>(null);
  const [isPost, setIsPost] = useState<string | null>(null);

  const handleInputChange = (event: Event) => {
    setNewCustomList(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(newCustomList);
    try {
      await postCustomList(newCustomList)
      .then(() => setIsPost("New List Created"))
    } catch (error) {
      console.error(error);
      setHasError("Error: Unable to Create New List");
    }

    clearInput();
  };
  const clearInput = () => {
    setNewCustomList("");
    setTimeout(() => {
      setIsPost(null), setHasError(null);
    }, 3000);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create New List</h2>
      <form
        className="form--list"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="name" className="list--input">
          <input
            type="text"
            placeholder="Add Custom List Name"
            name="name"
            value={newCustomList}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </label>
        <button type="submit" value="Submit" className="form-button">
          Add My Custom List
        </button>
        {hasError && <h2 className="alert-msg">{hasError}</h2>}
        {isPost && <h2 className="alert-msg">{isPost}</h2>}
      </form>
    </div>
  );
};
