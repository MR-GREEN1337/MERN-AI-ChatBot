import { Router } from "express";
import appRouter from "./index.js";


const chatRoutes = Router();

appRouter.use("/user", chatRoutes);

export default chatRoutes;