import { Router } from "express";
const routerAccountInfo = Router()
import { create_account, find_all_acounts, find_acc_by_id, update_account, delete_acc } from "../controllers/account.info.controllers.js";

routerAccountInfo.post("/account_info", create_account)
routerAccountInfo.get("/account_info", find_all_acounts)
routerAccountInfo.get("/account_info/:id", find_acc_by_id)
routerAccountInfo.put("/account_info/:id", update_account)
routerAccountInfo.delete("/account_info/:id", delete_acc)

export default routerAccountInfo