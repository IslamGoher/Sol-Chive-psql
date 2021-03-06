import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";
import { errorHandler } from "./middlewares/error-handler";
import { notFound } from "./controllers/not-found";
import { router as userRouter } from "./routes/user";
import { router as solutionRouter } from "./routes/solution";
import { router as authRouter } from "./routes/auth";

const app: Application = express();

const port = process.env.PORT || 3000;

// morgan configuration
if (process.env.NODE_ENV === "development") {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(morgan("dev", {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    skip: (req, res) => {
      return req.url.startsWith("/docs/");
    }
  }));
}

// cors policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_DOMAIN}`);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// handling json requests
app.use(express.json());

// handling x-www-form-urlencoded requests
app.use(express.urlencoded({ extended: false }));

// using routers
app.use("/api/v1", userRouter);
app.use("/api/v1", solutionRouter);
app.use("/api/v1/auth", authRouter);
app.use(notFound);

// using error handler
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `server is running on port ${port} in ${process.env.NODE_ENV} mode`
  );
});
