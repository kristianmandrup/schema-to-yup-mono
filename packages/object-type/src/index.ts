import { ObjectGuard } from "./guard";

export const toYupObject = (obj, config = {}) => {
  return obj && new ObjectGuard(obj, config).handle();
};

export { ObjectGuard };
export { YupObject } from "./object";
export * as constraints from "./constraints";
