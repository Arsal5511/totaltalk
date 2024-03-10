import { checkUser, getAllUsers, onBoardUser } from "../controllers/AuthController.js"
import {Router} from "express"

const router = Router()
// check user exist or new 
router.post("/check-user", checkUser)
// check if user is new or not
router.post("/onboard-user", onBoardUser)
// check for all users who are signed in
router.get("/get-contacts", getAllUsers)


export default router