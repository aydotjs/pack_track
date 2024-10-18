import { useState, useEffect } from "react";

// Initial items for packing list
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Shoes", quantity: 1, packed: true },
];

// Main App component
export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItems}
      />
      <Stats />
    </div>
  );
}

// Logo component
function Logo() {
  return <h1>Far Away 🧳</h1>;
}

// Form component for adding items to the packing list
function Form({ onAddItems }) {
  const [description, setDescription] = useState(""); // State for item description
  const [numOfItem, setNumOfItems] = useState(1); // State for number of items
  // useEffect(() => {
  //   console.log(items);
  // }, [items]);
  // Function to add a new item to the packing list

  // Handle form submission to add a new item
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      return; // Prevent adding empty items
    }

    // Create new item object
    const newItem = {
      description,
      quantity: numOfItem, // Changed key to quantity
      packed: false,
      id: Date.now(), // Unique id for the item
    };

    onAddItems(newItem); // Add the new item to the list

    // Reset input fields
    setDescription("");
    setNumOfItems(1);
  }

  // Handle changes to the item description input
  function handleChange(e) {
    setDescription(e.target.value);
  }

  // Handle changes to the number of items select
  function handleNumberOfItems(e) {
    setNumOfItems(+e.target.value); // Convert to number
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

// Packing list component to display added items
function PackingList({ items, onDeleteItems, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => {
          return (
            <Item
              item={item}
              key={item.id}
              items={items}
              onDeleteItems={onDeleteItems}
              onToggleItems={onToggleItems}
            />
          );
        })}
      </ul>
    </div>
  );
}

// Individual item component for the packing list
function Item({ item, onDeleteItems, onToggleItems }) {
  function handleDeleteItems() {
    onDeleteItems(item.id);
  }
  function handleToggleItems() {
    onToggleItems(item.id);
  }
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={handleToggleItems} />
      <span className={item.packed ? `line-through` : ""}>
        {item.quantity} {item.description}
      </span>
      <button onClick={handleDeleteItems}>❌</button>
    </li>
  );
}

// Stats component to show packing statistics
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
