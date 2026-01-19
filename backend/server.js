import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./config/db.js";
import path from "path";
import invoiceRouter from "./routes/invoiceRouter.js";
import businessProfileRouter from "./routes/businessProfileRouter.js";
import aiInvoiceRouter from "./routes/aiInvoiceRouter.js";
console.log("ENV DEBUG:", {
  cwd: process.cwd(),
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ? "FOUND" : "MISSING",
});

const app = express();
const port = 4000;
// MIDDLEWARES
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-invoice-generator-six.vercel.app",
  "https://ai-invoice-generator-git-main-sandeep-2412s-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server / curl
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // TEMP: allow all to avoid Vercel preview issues
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(clerkMiddleware());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
// DB
connectDB();

// ROUTES
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/invoice", invoiceRouter);
app.use("/api/businessProfile", businessProfileRouter);
app.use("/api/ai", aiInvoiceRouter);
app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
