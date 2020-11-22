import { Loggable } from "@schema-to-yup/core";
import { TypeErrorHandler } from "./type-error-handler";

export class BaseTypeConstraint extends Loggable {
  typeHandler: any;
  value: any;
  errorHandler: any;

  constructor(handler, opts = {}) {
    super(opts);
    this.typeHandler = handler;
    this.value = handler.value;
    this.errorHandler = handler.errorHandler || this.createTypeErrorHandler();
  }

  createTypeErrorHandler() {
    return new TypeErrorHandler(this.opts);
  }

  get base() {
    return this.handler.base;
  }

  get constraints() {
    return this.handler.constraints;
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

  get addConstraint() {
    return this.typeHandler.addConstraint;
  }
}
