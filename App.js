import './App.css';
import express from "express";
import rootRoutes from "./routers/roorRoutes";

import path from "path";
import morgan from "morgan";
import cors from "cors";
import { connectDb } from "./config/db.js";


import dessertsRoutes from "./routes/desserts.routes.js";
import drinksRoutes from "./routes/drinks.routes.js";
import foodRoutes from "./routes/food.routes.js";
import "./strategy/auth.js";


import dotenv from "dotenv";
import { trimQueryMiddleware } from "./middlewares/trimQuery.middleware.js";
import { checkRole, protect } from "./middlewares/auth.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use(trimQueryMiddleware);
app.use(cors());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


app.use("/api/food", foodRoutes);
app.use("/api/desserts", dessertsRoutes);
app.use("/api/drinks", drinksRoutes);

// function App() {
//   return (
//     <div className="App">
     
//     </div>
//   );
// }
app.use(errorHandler);

// const __dirname = path.resolve();

app.use("/api",rootRoutes);
export default app;
