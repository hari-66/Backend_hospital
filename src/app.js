// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
// import routes from "./routes/index.js";
// import errorMiddleware from "./middlewares/error.middleware.js";

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(helmet());
// app.use(morgan("dev"));

// app.use("/api", routes);
// app.use(errorMiddleware);

// export default app;
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json()); // ⭐ MUST
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", routes);
app.use(errorMiddleware);

export default app;
