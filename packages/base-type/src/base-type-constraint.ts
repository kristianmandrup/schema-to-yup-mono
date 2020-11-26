import { Base } from "@schema-to-yup/core";
import { TypeErrorHandler } from "./type-error-handler";

export class BaseTypeConstraint extends Base {
  handler: any;
  errorHandler: any;

  constructor(handler, propertySchema, config = {}) {
    super(propertySchema, config);
    this.handler = handler;
    this.errorHandler = handler.errorHandler || this.createTypeErrorHandler();
  }

  setTypeInstance(inst) {
    this.handler.setTypeInstance(inst);
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
    return new TypeErrorHandler(this.propertySchema);
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
