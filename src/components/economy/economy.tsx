import React, { useState } from "react";
import styles from "./economy.module.css";


const Economy: React.FC = () => {
  const [income, setIncome] = useState<number>(0);
  const [costs, setCosts] = useState<number>(0);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(Number(e.target.value));
  };

  const handleCostsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCosts(Number(e.target.value));
  };

  return (
    <div className={styles.economyContainer}>
      <h1>Economy</h1>
      
      <section className={styles.incomeSection}>
        <h2>Income</h2>
        <input
          type="number"
          placeholder="Enter income"
          value={income}
          onChange={handleIncomeChange}
        />
        <p>Total Income: ${income.toFixed(2)}</p>
      </section>

      <section className={styles.costsSection}>
        <h2>Costs</h2>
        <input
          type="number"
          placeholder="Enter costs"
          value={costs}
          onChange={handleCostsChange}
        />
        <p>Total Costs: ${costs.toFixed(2)}</p>
      </section>
    </div>
  );
};

export default Economy;


