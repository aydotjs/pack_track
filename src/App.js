import { useState, useEffect } from "react";

// Initial items for packing list
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Shoes", quantity: 1, packed: true },
];

// Main App component
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

// Logo component
function Logo() {
  return <h1>Pack Track 🧳</h1>;
}

// Form component for adding items to the packing list
function Form() {
  return (
    <form className="add-form">
      <h3>What do you need for your 🧳 trip?</h3>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <input type="text" placeholder="Item.." />
      <button>Add</button>
    </form>
  );
}

// Packing list component to display added items
function PackingList({ items }) {
  return <div className="list">LIST</div>;
}

// Stats component to show packing statistics
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
// NOTES
//- Derived state refers to a situation where the state of a component is calculated or derived from other existing state or props.
