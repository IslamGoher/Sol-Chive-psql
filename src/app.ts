import express, { Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";

const app: Application = express();

dotenv.config({path: __dirname + "/../.env"});

const port = process.env.PORT || 3000;

// morgan configuration
if(process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// handling json requests
app.use(express.json());

// handling x-www-form-urlencoded requests
app.use(express.urlencoded({extended: false}));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${port} in ${process.env.NODE_ENV} mode`);
});