import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from './config/db.connection';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});

export default app;