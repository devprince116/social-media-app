// setup server
import express from "express";
import "reflect-metadata";
import cors from "cors";
import dotenv from "dotenv";
import { loadConfig } from "./common/helper/config.helper";
import { sendNotification } from "./common/template/mail.template";
import { Request, Response, NextFunction } from "express";
import { setupSwagger } from "./common/helper/config.swagger";
import mailSender from "./common/service/mail.service"
dotenv.config();
loadConfig();
const PORT = process.env.PORT || 4000;

//  import routes;
import routes from "./routes"
import { initDb } from "./common/service/database.service"

//  now create app
const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// default route

app.get("/", (req, res) => {
    res.json({
        message: `App is running on port: ${PORT}`,
    });
});

// now create routes;
app.use("/api/v1", routes);

setupSwagger(app);
//  database connection;
initDb();

const sendmail = async (): Promise<void> => {
    await mailSender("cyrushop62@gmail.com", "test-mail", sendNotification("cyrushop62@gmail.com", "test-success"))
}

// sendmail();

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.error("Unhandled Error:", err);
//     res.status(500).json({ message: "Internal Server Error" });
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
