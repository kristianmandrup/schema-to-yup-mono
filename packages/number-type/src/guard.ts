import { BaseGuard } from "@schema-to-yup/core";

export class Guard extends BaseGuard {
  isValid() {
    return this.config.isNumber(this.propertySchema);
  }
}

export function createNumberGuard(propertySchema, config) {
  return new Guard(propertySchema, config);
}
