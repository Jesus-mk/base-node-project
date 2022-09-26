import { Response, Router } from "express";
import { searchFilters } from "../../tools/interfaceTools";
import { userService } from "./index";
import User, { IUser } from "./User";
import { DBProperties } from "./userEnum";
import { validateUser, validateUserConstraints } from "./userMiddleware";

const router = Router();

router.get("/all", async (_req, res: Response) => {
  res.send(await userService.findAll());
});

router.get("/property/:property", async (req: { body: IUser; params: { property: string } }, res: Response) => {
  res.send(await userService.findByPorperty(DBProperties.email, req.params.property));
});

router.post("/propertyM/", async (req: { body: searchFilters<IUser>[] }, res: Response) => {
  res.send(await userService.findByFilter<IUser>(req.body));
});

router.get("/:id", async (req, res: Response) => {
  res.send(await userService.findById(parseInt(req.params.id)));
});

router.post("/", validateUser, validateUserConstraints, async (req: { body: IUser }, res: Response) => {
  const user = new User(req.body.email, req.body.password, req.body.idEmployee);

  res.send(await userService.create(user));
});

router.put("/:id", validateUser, async (req: { body: IUser; params: { id: string } }, res) => {
  const user = new User(req.body.email, req.body.password, req.body.idEmployee);
  res.send(await userService.update(user, parseInt(req.params.id)));
});

router.delete("/:id", async (req, res) => {
  res.send(await userService.deleteById(parseInt(req.params.id)));
});

export default router;
