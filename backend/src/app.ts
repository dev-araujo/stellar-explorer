import cors from "cors";
import express from "express";
import stellarRoutes from "./routes/stellar.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", stellarRoutes);

export default app;
