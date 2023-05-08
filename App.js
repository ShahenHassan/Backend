const express = require("express");
const auth = require("./strategy/auth");
const morgan = require("morgan");
const rootRoutes = require("./routers/roorRoutes");
const dessertsRoutes = require("./routes/desserts.routes.js");
const drinksRoutes = require("./routes/drinks.routes.js");
const foodRoutes = require("./routes/food.routes.js");


const path = require("path");
const cors = require("cors");
const connectDb = require("./config/db.js");
const dotenv = require("dotenv");
const trimQueryMiddleware = require("./middlewares/trimQuery.middleware.js");
const protect = require("./middlewares/auth.middleware.js");
const checkRole = require("./middlewares/auth.middleware.js");
const errorHandler = require("./middlewares/errorHandler.middleware.js");

console.log(1);
dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use(trimQueryMiddleware);
console.log("1.5");
app.use(cors());
console.log(2);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api", rootRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/desserts", dessertsRoutes);
app.use("/api/drinks", drinksRoutes);
console.log(3);


app.use(errorHandler);

// const __dirname = path.resolve();

export default app;
