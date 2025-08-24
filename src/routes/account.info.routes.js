import { Router } from "express";
const routerAccountInfo = Router()
import { createAccount, findAllAccounts, findAccById, updateAccount, deleteAcc } from "../controllers/account.info.controllers.js";

routerAccountInfo.post("/account_info", createAccount);
routerAccountInfo.get("/account_info", findAllAccounts);
routerAccountInfo.get("/account_info/:id", findAccById);
routerAccountInfo.put("/account_info/:id", updateAccount);
routerAccountInfo.delete("/account_info/:id", deleteAcc);

export default routerAccountInfo