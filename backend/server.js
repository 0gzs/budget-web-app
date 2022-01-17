import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import accounts from './routes/accounts.route.js';
import users from './routes/users.route.js';
import categories from './routes/categories.route.js';
import transactions from './routes/transactions.route.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/v1/accounts", accounts);
app.use("/api/v1/users", users);
app.use("/api/v1/categories", categories);
app.use("/api/v1/transactions", transactions);
app.use("*", (req, res) => res.status(400).json({ error: "not found"}));

export default app;