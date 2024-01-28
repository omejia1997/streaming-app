import { CategoryRS } from "./CategoryRS";
import { PlanRS } from "./PlanRS";

export type PlanCategoryRS = {
  id?: number;
  plan?: PlanRS;
  category?: CategoryRS;
};
