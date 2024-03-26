import express from "express";
import { getAllTags } from "../controllers/tags.controller";

const tagsRouter = express.Router();

export default tagsRouter
    .get("/", getAllTags)