import { Router } from "express";

import cityRoutes from "./city.routes";
import weatherRoutes from "./weather.routes";
import subscriptionRoutes from "./subscription.routes";
import { uncaughtErrorHandling } from "./middlewares/errors";

const router = Router();

router.use(subscriptionRoutes, weatherRoutes, cityRoutes);

router.use(uncaughtErrorHandling);

export default router;
