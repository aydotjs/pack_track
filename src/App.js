import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Shoes", quantity: 1, packed: true },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
// testing

function Logo() {
  return <h1>Far Away 🧳</h1>;
}

function Form() {
  const [description, setDescription] = useState("");
  const [numOfItem, setNumOfItems] = useState(1);
  const [items, setItems] = useState([]);
  
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    console.log(items);
  }
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
    handleAddItems(newItem);

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

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => {
          return <Item item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
}
function Item({ item: { description, packed, id, quantity } }) {
  return (
    <li>
      <span className={packed ? `line-through` : ""}>
        {quantity} {description}
      </span>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
