import { Response, Router } from "express";
import { employeeService } from ".";
import { searchFilters } from "../../tools/interfaceTools";
import Employee, { IEmployee } from "./Employee";
import { DBProperties } from "./employeeEnum";
import { validateEmployee } from "./employeeMiddleware";

const router = Router();

router.get("/all", async (_req, res: Response) => {
  res.send(await employeeService.findAll());
});

router.get("/property/", async (_req, res: Response) => {
  res.send(await employeeService.findByProperty(DBProperties.name, "faa")); // TODO Check the performance of this method comparing to the multiple version, it may not be necessary.
});

router.post("/propertyM/", async (req: { body: searchFilters<IEmployee>[] }, res: Response) => {
  res.send(await employeeService.findByFilter<IEmployee>(req.body));
});

router.get("/user", async (_req, res: Response) => {
  res.send(await employeeService.getJoinUser());
});

router.get("/:id", async (req, res: Response) => {
  res.send(await employeeService.findById(parseInt(req.params.id)));
});

router.post("/", validateEmployee, async (req: { body: IEmployee }, res: Response) => {
  const employee = new Employee(req.body.name, req.body.secondName, req.body.contactEmail, req.body.thirdName);

  res.send(await employeeService.create(employee));
});

router.put("/:id", validateEmployee, async (req: { body: IEmployee; params: { id: string } }, res) => {
  const employee = new Employee(req.body.name, req.body.secondName, req.body.contactEmail, req.body.thirdName);
  res.send(await employeeService.update(employee, parseInt(req.params.id)));
});

router.delete("/:id", async (req, res) => {
  res.send(await employeeService.deleteById(parseInt(req.params.id)));
});

/** Route for developing purposes*/
router.post("/test", (_req, res) => {
  res.send(employeeService.test());
});

export default router;
