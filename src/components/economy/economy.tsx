import React, { useState } from "react";
import styles from "./economy.module.css";

const Economy: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("groceries");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = async () => {
    const walletId = localStorage.getItem("walletId");
    if (!walletId) {
      alert("You need to log in first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/expenditure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletId: parseInt(walletId),
          category: selectedCategory,
          amount: amount,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit expense");
      alert("Expense added successfully!");
    } catch (error) {
      alert("Error adding expense.");
    }
  };

  return (
      <div className={styles.container}>
        <h2>Economy Tab</h2>
        <label>Category:</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="groceries">Groceries</option>
          <option value="rent">Rent</option>
          <option value="transport">Transport</option>
        </select>
        <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
  );
};

export default Economy;
