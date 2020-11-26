import { BaseGuard } from "@schema-to-yup/core";

export class Guard extends BaseGuard {
  isBoolean() {
    return this.config.isBoolean(this.obj);
  }

  guard() {
    return this.isBoolean();
  }
}

export const createGuard = (obj, config) => new Guard(obj, config);

export const guard = (obj, config) => obj && createGuard(obj, config).guard();
