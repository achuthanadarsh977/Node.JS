// app.js
import express from "express";
import morgan from "morgan";        // for logging HTTP requests
import helmet from "helmet";        // for security headers
import cors from "cors";            // for cross-origin requests
import winston from "winston";      // for logging

const app = express();

// Middleware
app.use(express.json());            // parse JSON request bodies
app.use(morgan("dev"));             // log requests to console
app.use(helmet());                  // secure HTTP headers
app.use(cors());                    // enable CORS

// Winston logger setup
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" })
  ],
});

// Example route
app.get("/", (req, res) => {
  logger.info("Root route accessed");
  res.send("Hello from Node.js + Express!");
});

// Export app for integration testing or server.js
export default app;
