import express, { Request, Response } from 'express';
import mysql, { Connection, QueryError } from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // default XAMPP username
  password: '', // default XAMPP password
  database: 'your_database_name', // replace with your database name
});

db.connect((err: QueryError | null) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Interface for Economy Data
interface EconomyData {
  id: number;
  category: string;
  amount: number;
  created_at: string; // Assuming your table has a timestamp column
}

// API Endpoint to Insert Data
app.post('/api/economy', (req: Request, res: Response) => {
  const { category, amount } = req.body;
  const sql = 'INSERT INTO economy (category, amount) VALUES (?, ?)';
  db.query(sql, [category, amount], (err: QueryError | null, result: any) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Data inserted...');
  });
});

// API Endpoint to Fetch Data (Step 1)
app.get('/api/economy', (req: Request, res: Response) => {
  const sql = 'SELECT * FROM economy';
  db.query(sql, (err: QueryError | null, results: EconomyData[]) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});