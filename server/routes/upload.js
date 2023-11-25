import dotenv from "dotenv";
import express from "express";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        console.log("upload file successfully!");
    } catch (error) {
        console.log("error: ", error);
    }
});

export default router;
