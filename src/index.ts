import express, { Express } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./docs/swagger_output.json";
import fs from "fs";
import path from "path";

import router from "./routes/api";

import db from "./utils/database";

function docs(app: Express) {
  const css = fs.readFileSync(
    path.resolve(__dirname, "../node_modules/swagger-ui-dist/swagger-ui.css"),
    "utf8"
  );
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerOutput, {
      customCss: css,
    })
  );
}

async function init() {
  try {
    const result = await db();

    console.log("database status: ", result);

    const app = express();
    app.use(bodyParser.json());

    const PORT = 3000;

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Server is running",
        data: null,
      });
    });

    app.use("/api", router);
    docs(app);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
