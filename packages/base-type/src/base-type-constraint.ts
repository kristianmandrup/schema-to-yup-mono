import { Base } from "@schema-to-yup/core";
import { TypeErrorHandler } from "./type-error-handler";

export class BaseTypeConstraint extends Base {
  handler: any;
  errorHandler: any;

  constructor(handler, opts = {}) {
    super(opts);
    this.handler = handler;
    this.errorHandler = handler.errorHandler || this.createTypeErrorHandler();
  }

  get yup() {
    return this.handler.yup;
  }

  get type() {
    return this.handler.type;
  }

  get value() {
    return this.handler.value;
  }

  get key() {
    return this.handler.key;
  }

  get format() {
    return this.handler.format;
  }

  init() {}

  createYupSchemaEntry(_ = {}) {}

  createTypeErrorHandler() {
    return new TypeErrorHandler(this.opts);
  }

  get base() {
    return this.handler.base;
  }

  get constraints() {
    return this.handler.constraints;
  }

  constraintNameFor(...names) {
    return this.handler.constraintNameFor(...names);
  }

  set base(base) {
    this.handler.base = base;
  }

  chain(cb) {
    return this.handler.chain(cb);
  }

  valErrMessage(msg) {
    return this.handler.valErrMessage(msg);
  }

  valErrMessageOr(...msgNames) {
    return this.handler.valErrMessageOr(...msgNames);
  }

  addConstraint(name, opts = {}) {
    return this.handler.addConstraint(name, opts);
  }
}
