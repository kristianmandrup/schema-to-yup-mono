import { StringGuard } from "./guard";
export * as StringConstraints from "./constraints";

export const toYupString = (obj, config = {}) => {
  return obj && new StringGuard(obj, config).handle();
};

export { YupString } from "./string";
