import Router from "express";
import * as AuthController from "../controllers/auth.controllers.js";
const router = Router()
           
import { verifySignup } from "../middlewares";   //MIDDLEWARES

router.post('/signup',verifySignup.checkUsernameAndEmail , AuthController.signUp);

router.post('/signin', AuthController.signIn)

export default router