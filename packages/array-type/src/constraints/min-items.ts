import { BaseItems } from "./base-items";

export const minItems = (handler, opts) => new MinItems(handler, opts);

export class MinItems extends BaseItems {
  constructor(handler, opts: any = {}) {
    super(opts.config);
    this.handler = handler;
  }

  process() {
    const { constraints, sizeHelper } = this;
    const { minItems, min } = constraints;
    const { handleInvalidSize, isValidSize } = sizeHelper;
    const $min = minItems || min;
    if (!this.isNumberType($min)) {
      return this;
    }
    if (!isValidSize($min)) {
      return handleInvalidSize("minItems", $min);
    }
    return this.chain((x) => $min && x.min($min));
  }
}
