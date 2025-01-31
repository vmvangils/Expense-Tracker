import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Navbar from "../navbar/Navbar";

interface EconomyData {
  id: number;
  category: string;
  amount: number;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<EconomyData[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accountId = 1; // 🔥 Replace this with actual logged-in user ID

  useEffect(() => {
    fetchData();
    fetchWalletBalance();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/wallet/${accountId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchWalletBalance = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/wallet/${accountId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch wallet balance");
      }
      const result = await response.json();
      setBalance(result.balance);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
      <div className={styles.dashboardContainer}>
        <Navbar />
        <aside className={styles.sidebar}>
          <h2>Dashboard</h2>
          <ul>
            <li>📊 Dashboard</li>
            <li>💰 Economy</li>
            <li>📈 Reports (Graph)</li>
            <li>👤 Accounts</li>
          </ul>
        </aside>

        <main className={styles.mainContent}>
          <h1 className={styles.title}>Dashboard</h1>

          <div className={styles.gridContainer}>
            <div className={styles.walletSection}>
              <h2>Wallet Balance</h2>
              <p className={styles.balance}>€{balance.toFixed(2)}</p>
            </div>

            <div className={styles.expenseSection}>
              <h2>New Expense</h2>
              <form>
                <input type="text" placeholder="Category" />
                <input type="number" placeholder="Amount (€)" />
                <button type="submit">Add Expense</button>
              </form>
            </div>

            <div className={styles.walletHistory}>
              <h2>Wallet History</h2>
              <ul>
                {data.map((item) => (
                    <li key={item.id}>
                      {item.category}: -€{item.amount.toFixed(2)} on{" "}
                      {new Date(item.created_at).toLocaleDateString()}
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
  );
};

// ✅ Ensure this is OUTSIDE of all functions or blocks
export default Dashboard;