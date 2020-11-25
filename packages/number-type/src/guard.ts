import { BaseGuard } from "@schema-to-yup/core";

export class Guard extends BaseGuard {
  constructor(obj, config) {
    super(obj, config);
  }

  isValid() {
    return this.config.isNumber(this.obj);
  }
}

export function createNumberGuard(obj, config) {
  return new Guard(obj, config);
}
