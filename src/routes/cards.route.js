import { Router } from "express";
import upload from "../middleware/upload.middleware.js";
import * as cardsController from "../controllers/cards.controller.js";

const cardRouter = Router();

console.log("Upload middleware type:", typeof upload);


const cpUpload = upload.fields([
  { name: "images", maxCount: 10 },
  { name: "song", maxCount: 1 },
]);

cardRouter.post("/create", cpUpload, cardsController.createCard);
cardRouter.get("/:id", cardsController.getCard);

export default cardRouter;
