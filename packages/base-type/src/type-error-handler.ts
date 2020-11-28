import { ErrorMessageHandler, Loggable } from "@schema-to-yup/core";

export class TypeErrorHandler extends Loggable {
  handler: any;
  errorMessageHandler: any;

  constructor(handler, opts = {}) {
    super(opts);
    this.handler = handler;
    this.init();
  }

  get key() {
    return this.handler.key;
  }

  get type() {
    return this.handler.type;
  }

  init() {
    const { config } = this;
    const errorMessageHandlerFactoryFn =
      this.config.createErrorMessageHandler || this.createErrorMessageHandler;

    this.errorMessageHandler = errorMessageHandlerFactoryFn(this, config);
  }

  createErrorMessageHandler(typeHandler, config = {}) {
    return new ErrorMessageHandler(typeHandler, config);
  }

  valErrMessage(msgName) {
    return this.errorMessageHandler.valErrMessage(msgName);
  }

  valErrMessageOr(...msgNames) {
    for (let name of msgNames) {
      const errMsg = this.valErrMessage(name);
      if (errMsg) return errMsg;
    }
  }

  get messageMap() {
    const { config, key, type } = this;
    const { messages } = config;
    return messages[key] || messages[type] || {};
  }

  errMessage(errKey = "default") {
    return this.messageMap[errKey] || "error";
  }

  errorMsg(msg) {
    this.throwError(msg);
  }

  error(name, msg) {
    const label = `[${name}]`;
    const fullMsg = [label, msg].join(" ");
    this.errorMsg(fullMsg);
  }

  // throw ConvertYupSchemaError(fullMsg);
  throwError(msg) {
    throw msg;
  }
}
