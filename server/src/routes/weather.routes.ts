import { Router } from "express";

import { cityWeather } from "../controllers/weather.controller";

const router = Router();

router.get("/weather", cityWeather);

export default router;
