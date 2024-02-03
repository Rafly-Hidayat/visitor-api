import express from "express";
import cors from "cors";
import router from "./router/router.js";
import { errorMiddleware } from "./middleware/err-middleware.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
};
app.use(cors(corsOptions));

app.use("/api", router);

app.use(errorMiddleware)
app.use("*", function (req, res) {
    res.status(404).send("PAGE NOT FOUND");
});

app.listen(port, () => console.log(`App listening on ${port}`));
