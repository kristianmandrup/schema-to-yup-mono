import { BaseItems } from "./base-items";

export const maxItems = (handler, opts) => new MaxItems(handler, opts);

export class MaxItems extends BaseItems {
  constructor(handler, opts: any = {}) {
    super(opts.config);
    this.handler = handler;
  }

  process() {
    const { constraints, sizeHelper } = this;
    const { maxItems, max } = constraints;
    const { handleInvalidSize, isValidSize } = sizeHelper;
    const $max = maxItems || max;
    if (!this.isNumberType($max)) {
      return this;
    }
    if (!isValidSize($max)) {
      return handleInvalidSize("maxItems", $max);
    }
    return this.chain((x) => $max && x.max($max));
  }
}
