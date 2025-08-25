import { Router } from "express";
const routerAccountInfo = Router()
import { createAccount, findAllAccounts, findAccById, updateAccount, deleteAcc } from "../controllers/account.info.controllers.js";
import { createAccValidation, updateAccValidation, getAccIDValidation, deleteAccValidation } from "../middlewares/account.info.validations.js"
import { validator } from "../middlewares/validator/validator.js"

routerAccountInfo.post("/account_info", createAccValidation, validator, createAccount);
routerAccountInfo.get("/account_info", findAllAccounts);
routerAccountInfo.get("/account_info/:id", getAccIDValidation, validator, findAccById);
routerAccountInfo.put("/account_info/:id", updateAccValidation, validator, updateAccount);
routerAccountInfo.delete("/account_info/:id", deleteAccValidation, validator, deleteAcc);

export default routerAccountInfo