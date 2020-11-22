import { BaseTypeConstraint } from "@schema-to-yup/base-type";

export const format = (handler, opts) => new Format(handler, opts);

export class Format extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    if (!this.config.format === true) return;
    const format = this.format;
    if (this.yup.prototype[format]) {
      this.addConstraint(this.format);
    }
  }
}
