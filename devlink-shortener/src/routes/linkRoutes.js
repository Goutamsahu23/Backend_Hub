import express from "express";
import { shortenUrl, redirect, analytics } from "../controllers/linkController.js";

const router = express.Router();

router.post("/api/shorten", shortenUrl);
router.get("/:shortId", redirect);
router.get("/api/analytics/:shortId", analytics);

export default router;
