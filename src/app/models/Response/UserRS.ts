import { PlanRS } from "./PlanRS";

export type UserRS = {
  id?: number;
  birthdate?: Date;
  email?: string;
  isAdult?: boolean;
  photoUrl?: string;
  state?: string;
  use_date_limit?: Date;
  plan?: PlanRS;
  rolRS?: String;
};
