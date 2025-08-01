import React, { useEffect, useState } from "react";
import Form from "./Form/Form";
import Item from "./Item/Item";
import "./Container.css";


function Container(props) {
    const [items, setItems] = useState([]);

    function passPrompt() {
        props.update(props.level, items);
    }

    useEffect(() => {
        passPrompt();
    }, [items]);

    function addItem(item) {
        setItems(prevItems =>{
            return [...prevItems, item];
        });
    }

    function deleteItem(id) {
        setItems(prevItems => {
            return prevItems.filter((item, index) => {
                return index !== id;
            });
        });
    }

    return(
    <div className="container">
        <div className="level"><p>{props.level}</p></div>
        <div className="items">
            <div className="items-container">
                {items.map((item, index) => {
                    return (
                        <Item
                            key={index}
                            id={index}
                            text={item}
                            onDelete={deleteItem}
                        />
                    );
                })}
            </div>
            <Form 
                onAdd={addItem}
            />
        </div>
    </div>
    );
}

export default Container;