import { useEffect, useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Shoes", quantity: 1, packed: true },
];
export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => items.slice().concat(item));
  }
  function deleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function alertNumOfItems(){
    alert(`There are ${items.length} items in the packing list`)
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItems={deleteItems} />
      <Stats onAlertNumOfItems = {alertNumOfItems} />
    </div>
  );
}
// testing

function Logo() {
  return <h1>Far Away 🧳</h1>;
}

function Form({ onAddItems, number }) {
  const [description, setDescription] = useState("");
  const [numOfItem, setNumOfItems] = useState(1);
  // handling the submission of the form
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      return;
    }
    const newItem = {
      description,
      numOfItem,
      packed: false,
      id: Date.now(),
    };
    onAddItems(newItem);

    setDescription("");
    setNumOfItems(1);
  }
  // handling the change in input
  function handleChange(e) {
    setDescription(e.target.value);
  }
  function handleNumberOfItems(e) {
    setNumOfItems(+e.target.value);
  }

  return (
    <form className="add-form">
      <h3>What do you need for your 🧳 trip?</h3>
      <select onChange={handleNumberOfItems} value={numOfItem}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((itemNumber) => {
          return (
            <option value={itemNumber} key={itemNumber}>
              {itemNumber}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        value={description}
        onChange={handleChange}
        placeholder="Item.."
      />
      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => {
          return (
            <Item item={item} key={item.id} onDeleteItems={onDeleteItems} />
          );
        })}
      </ul>
    </div>
  );
}
function Item({ item: { description, packed, id, numOfItem }, onDeleteItems }) {
  function handleDelete() {
    onDeleteItems(id);
  }
  return (
    <li>
      <span className={packed ? `line-through` : ""}>
        {numOfItem} {description}
      </span>
      <button onClick={handleDelete}>❌</button>
    </li>
  );
}
function Stats({onAlertNumOfItems}) {
  function handleAlert(){
    onAlertNumOfItems()
  }
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
      <button onClick={handleAlert}>Click me to get all the number of items in your packing list</button>
    </footer>
  );
}
