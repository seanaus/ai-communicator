import express from "express";
import * as  config from "./config/config.js";
import * as route from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use("/api", route.routes);

app.listen(config.port, "0.0.0.0", () => {
    console.log(`${config.appName} listening on ${config.url}`);
});

