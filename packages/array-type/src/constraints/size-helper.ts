import { Loggable, typeMatcher } from "@schema-to-yup/core";

export const arraySizeHelper = (opts) => new ArraySizeHelper(opts);

export class ArraySizeHelper extends Loggable {
  constructor(config = {}) {
    super(config);
  }

  handleInvalidSize(name, value) {
    const msg = `invalid array size constraint for ${name}, was ${value}. Must be a number >= 0`;
    if (this.config.warnOnInvalid) {
      this.warn(msg);
      return this;
    }
    this.error(msg, value);
    return this;
  }

  isValidSize(num) {
    return typeMatcher.isNumberType(num) && num >= 0;
  }
}
