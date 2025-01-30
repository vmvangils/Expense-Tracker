// src/pages/Report.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './report.module.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
}

const Report: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch expenses from the backend
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses');
        setExpenses(response.data);
      } catch (err) {
        setError('Failed to fetch expenses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Transform data for Recharts
  const categoryTotals = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  // Colors for the chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.reportContainer}>
      <h1 className={styles.reportTitle}>Expense Report</h1>

      {/* Bar Chart */}
      <div className={styles.chartContainer}>
        <h2>Expenses by Category (Bar Chart)</h2>
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Pie Chart */}
      <div className={styles.chartContainer}>
        <h2>Expenses by Category (Pie Chart)</h2>
        <PieChart width={600} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Table */}
      <table className={styles.expenseTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Category</th>
            <th className={styles.tableHeader}>Amount</th>
            <th className={styles.tableHeader}>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className={styles.tableRow}>
              <td className={styles.tableCell}>{expense.category}</td>
              <td className={styles.tableCell}>${expense.amount.toFixed(2)}</td>
              <td className={styles.tableCell}>
                {new Date(expense.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;