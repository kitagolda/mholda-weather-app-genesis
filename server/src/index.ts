import dotenv from "dotenv";

import app from "./app";
import { scheduleWeatherMailingCronJobs } from "./jobs/weatherUpdates.job";

dotenv.config();

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

scheduleWeatherMailingCronJobs();
