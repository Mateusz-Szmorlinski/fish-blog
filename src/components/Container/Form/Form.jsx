import React, { useState } from "react";
import "./Form.css";

function Form(props) {
  const [item, setItem] = useState();

  function handleAdd(event) {
    props.onAdd(item);
    setItem("");
    event.preventDefault();
  }

  function handleChange(event) {
    const { value } = event.target;
    setItem(value);
  }

  return (
    <div className="form">
      <form onSubmit={handleAdd}>
        <input 
        type="text"
        name="item"
        placeholder="keyword..."
        onChange={handleChange}
        value={item}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Form;
