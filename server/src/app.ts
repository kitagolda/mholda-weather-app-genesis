import path from "path";
import express from "express";

import routes from "./routes/index";

const app = express();

const clientPath = path.resolve(__dirname, "../../client/dist");

app.use(express.static(clientPath));

app.get("/", (_, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.use("/api", routes);

export default app;
