import { Guard } from "@schema-to-yup/core";

class NumberGuard extends Guard {
  constructor(obj, config) {
    super(obj, config);
  }

  isValid() {
    return this.config.isNumber(this.obj);
  }
}

function createNumberGuard(obj, config) {
  return new NumberGuard(obj, config);
}

export { createNumberGuard, NumberGuard };
