import express from "express";
import morgan from "morgan";

import {createRole} from "./libs/initialSetup";

import authRouter from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
createRole()

app.use(morgan('dev'))
app.use(express.json())

app.use('/', authRouter)
app.use('/users',userRoutes)

export default app
