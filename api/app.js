import express from "express";
import dotenv from "dotenv";
import ProductRoute from "./routes/product.route.js";
import AuthRoute from "./routes/auth.route.js";
import OrderRoute from "./routes/order.route.js";
import PaymentRoute from "./routes/payment.route.js";
import { connectDataBase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

//handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log("shutting down due to uncaught exception");
  process.exit(1);
});

dotenv.config({ path: "config/config.env" });

connectDataBase();

// const __dirname = path.resolve();

app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());

const server = app.listen(process.env.PORT, () => {
  console.log(`listening to port:${process.env.PORT} `);
});
app.use("/api/v1", ProductRoute);
app.use("/api/v1", AuthRoute);
app.use("/api/v1", OrderRoute);
app.use("/api/v1", PaymentRoute);

// app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

app.use(errorMiddleware);

//handle unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log("shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
