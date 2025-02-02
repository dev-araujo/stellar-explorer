import cors from "cors";
import express from "express";
import stellarRoutes from "./routes/stellar.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", stellarRoutes);

export default app;
