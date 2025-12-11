// Configure environment variables FIRST
require("dotenv").config();

// New Relic must be imported after dotenv, before any other modules
require('newrelic');
import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB, sequelize } from "./db";
import blogRouter from "./routes/routes";

const app = express();

app.use(express.json({ limit: "10kb" }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// ✅ CORS configurado para producción
const allowedOrigins: string[] = [
    "http://localhost:3000",
    process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
    cors({
        origin: allowedOrigins.length > 0 ? allowedOrigins : "*",
        credentials: true,
    })
);

// Ruta de bienvenida en la raíz
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "🚀 CRUD Blog API - DevOps Complete Stack",
        author: "Federico Marty & Sebastián Aldo López"
    });
});

app.get("/api/healthchecker", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "CRUD Blog API - DevOps Stack",
        author: "Federico Marty & Sebastián Aldo López",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
    });
});

app.use("/api/blogs", blogRouter);

//route not found - error display
app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        status: "fail",
        message: `Route: ${req.originalUrl} does not exist on this server`,
    });
});

// ✅ Puerto dinámico para Render (CRÍTICO)
const PORT = Number(process.env.PORT) || 8081;
app.listen(PORT, async () => {
    console.log(`🚀 Server started on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    await connectDB();
    sequelize.sync({ force: false }).then(() => {
        console.log("✅ Database Connected Successfully");
    });
});