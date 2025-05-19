import { Router } from "express";

import { searchCities } from "../controllers/city.controller";

const router = Router();

router.get("/cities", searchCities);

export default router;
