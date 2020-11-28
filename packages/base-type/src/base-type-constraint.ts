import { Base } from "@schema-to-yup/core";

export class BaseTypeConstraint extends Base {
  handler: any;

  constructor(handler, propertySchema, config = {}) {
    super(propertySchema, config);
    this.handler = handler;
  }

  setTypeInstance(inst) {
    this.handler.setTypeInstance(inst);
  }

  get errorHandler() {
    return this.handler.errorHandler;
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

  get constraints() {
    return this.handler.constraints;
  }

  constraintNameFor(...names) {
    return this.handler.constraintNameFor(...names);
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
