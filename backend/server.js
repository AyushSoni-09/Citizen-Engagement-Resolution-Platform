// src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import deptRoutes from './routes/department.routes.js';
import complaintRoutes from './routes/complaints.routes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/departments', deptRoutes);
app.use('/complaints', complaintRoutes);

app.get('/health', (_, res) => res.json({ ok: true }));

app.listen(process.env.PORT, () =>
  console.log(`Server on http://localhost:${process.env.PORT}`)
);