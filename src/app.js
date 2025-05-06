import express from "express";
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import rolesRouter from './routes/roles.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/hello", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
});

app.use('/users', usersRouter);
app.use('/roles', rolesRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
