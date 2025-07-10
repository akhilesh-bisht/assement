import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Enable CORS with specific origin and credentials
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

// Parse incoming JSON with size limit
app.use(
  express.json({
    limit: "20kb",
  })
);

// Parse URL-encoded payloads
app.use(
  express.urlencoded({
    extended: true,
    limit: "15kb",
  })
);

// Serve static files from /public
app.use(express.static("public"));

// Parse cookies
app.use(cookieParser());

// routes import
import boardRoutes from "./routes/board.routes.js";
import taskRoutes from './routes/task.routes.js'

//routes declarations
app.use("/boards", boardRoutes);
app.use("/tasks" , taskRoutes)

export { app };
