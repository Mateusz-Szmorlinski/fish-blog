import React from "react";
import "./Item.css";

function Item(props) {
    function handleDelete() {
        props.onDelete(props.id);
    }

    return(
        <div className="item">
            <p>{props.text}</p>
            <button onClick={handleDelete}></button>
        </div>
    );
};

export default Item;