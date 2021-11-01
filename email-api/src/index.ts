import "dotenv/config"
import express from 'express';
import cors from 'cors';
import email from "./routes/email_route"

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use("/email", email);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});