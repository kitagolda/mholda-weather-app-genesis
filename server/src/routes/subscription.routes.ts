import multer from "multer";
import { Router } from "express";

import { validateFormData } from "./middlewares/validation";

import {
  confirmSubscription,
  subscribeToWeatherUpdate,
  unsubscribeFromUpdateByFrequency,
} from "../controllers/subscription.controller";
import { subscriptionSchema } from "../schemas/subscription.schema";

const router = Router();

const upload = multer();

router.get("/confirm", confirmSubscription);

router.post(
  "/subscribe",
  upload.none(),
  validateFormData(subscriptionSchema),
  subscribeToWeatherUpdate
);

router.get("/unsubscribe", unsubscribeFromUpdateByFrequency);

export default router;
