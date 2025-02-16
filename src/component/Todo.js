import React, { useState, useEffect } from "react";
import "./style.css";

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  return lists ? JSON.parse(lists) : [];
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState(null);
  const [toggleButton, setToggleButton] = useState(false);

  // add the items function
  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the data");
      return;
    }

    if (toggleButton) {
      setItems(
        items.map((curElem) =>
          curElem.id === isEditItem ? { ...curElem, name: inputdata } : curElem
        )
      );
      setToggleButton(false);
      setIsEditItem(null);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
    }
    
    setInputData("");
  };

  // edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => curElem.id === index);
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // delete items
  const deleteItem = (index) => {
    setItems(items.filter((curElem) => curElem.id !== index));
  };

  // remove all elements
  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="#" alt="" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <br />

          <div className="addItem-container">
            <div className="addItems">
              <input
                type="text"
                placeholder="✍ Add Item"
                className="form-control"
                value={inputdata}
                onChange={(event) => setInputData(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addItem();
                    event.target.focus(); // Keeps focus on input field
                  }
                }}
                autoFocus // Automatically focuses input on load
              />
            </div>
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* Show our items */}
          <div className="showItems">
            {items.map((curElem) => (
              <div className="eachItem" key={curElem.id}>
                <h3>{curElem.name}</h3>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    onClick={() => editItem(curElem.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(curElem.id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>

          {/* Remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
