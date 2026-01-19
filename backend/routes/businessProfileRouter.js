import express from "express";
import multer from "multer";
import { clerkMiddleware } from "@clerk/express";
import path from "path";
import {
  createBusinessProfile,
  myBusinessProfile,
  updateBusinessProfile,
} from "../controllers/businessProfileController.js";
const businessProfileRouter = express.Router();
businessProfileRouter.use(clerkMiddleware());

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `Business-${unique}${ext}`);
  },
});

// To create
const upload = multer({ storage });
businessProfileRouter.post(
  "/",
  upload.fields([
    { name: "logoName", maxCount: 1 },
    { name: "stampName", maxCount: 1 },
    { name: "signatureNameMeta", maxCount: 1 },
  ]),
  createBusinessProfile
);

// To update
businessProfileRouter.put(
  "/:id",
  upload.fields([
    { name: "logoName", maxCount: 1 },
    { name: "stampName", maxCount: 1 },
    { name: "signatureNameMeta", maxCount: 1 },
  ]),
  updateBusinessProfile
);

// To get the profile
businessProfileRouter.get("/me", myBusinessProfile);

export default businessProfileRouter;
