import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";

const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const walletId = localStorage.getItem("walletId");

  useEffect(() => {
    if (!walletId) return;

    fetch(`http://localhost:5000/api/wallet/${walletId}`)
        .then((res) => res.json())
        .then((data) => setBalance(data.balance))
        .catch(() => setBalance(0));
  }, [walletId]);

  return (
      <div className={styles.dashboard}>
        <h1>Dashboard</h1>
        <h2>Wallet Balance: €{balance.toFixed(2)}</h2>
      </div>
  );
};

export default Dashboard;
