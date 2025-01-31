import React, { useState } from 'react';
import styles from './economy.module.css';

const Economy: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('groceries');
  const [amount, setAmount] = useState<number>(0);
  const accountId = 1; // TODO: Replace with logged-in user's ID

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategory,
          amount: amount,
          accountId: accountId, // ✅ Ensure it links to the user
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit data. Please try again.');
    }
  };

  return (
      <div className={styles.container}>
        <h2 className={styles.title}>Economy Settings</h2>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>Category: </label>
          <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={styles.select}
          >
            <option value="groceries">Groceries</option>
            <option value="rent">Rent</option>
            <option value="salary">Salary</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="amount" className={styles.label}>Amount: </label>
          <input
              id="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className={styles.input}
          />
        </div>
        <button onClick={handleSubmit} className={styles.button}>Submit</button>
      </div>
  );
};

export default Economy;