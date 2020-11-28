import { typeMatcher, Loggable } from "@schema-to-yup/core";
const { isNothing, isPresent } = typeMatcher;

export class ConstraintBuilder extends Loggable {
  handler: any;
  constraintsAdded: any;

  constructor(handler, config = {}) {
    super(config);
    this.handler = handler;
    this.constraintsAdded = {};
  }

  get errMessages() {
    return this.handler.errMessages;
  }

  get instance() {
    return this.handler.instance;
  }

  set setInstance(instance) {
    this.handler.instance = instance;
  }

  get key() {
    return this.handler.key;
  }

  get constraints() {
    return this.handler.constraints;
  }

  get errorMessageHandler() {
    return this.handler.errorMessageHandler;
  }

  // TODO: refactor into smaller methods!
  build(propName: string, constraint: any = {}) {
    let {
      constraintName,
      constraintValue,
      propValue,
      method,
      yup,
      values,
      errName,
    } = constraint;
    yup = yup || this.instance;

    constraintValue =
      constraintValue || propValue || this.constraints[propName];

    if (isNothing(constraintValue)) {
      this.warn("no prop value");
      return false;
    }
    constraintName = constraintName || propName;
    method = method || constraintName;

    const yupConstraintMethodName = this.aliasMap[method] || method;

    if (!yup[yupConstraintMethodName]) {
      const msg = `Yup has no such API method: ${yupConstraintMethodName}`;
      this.warn(msg);
      return false;
    }

    const constraintFn = yup[yupConstraintMethodName].bind(yup);

    const constraintErrMsg = this.valErrMessage(constraintName);
    const errErrMsg = errName && this.valErrMessage(errName);

    const errFn = constraintErrMsg || errErrMsg;

    const constrOpts = {
      constraintName,
      yup,
      constraintFn,
      errFn,
    };

    const constrainFnNames =
      this.constrainFnNames || this.config.constraintFnNames;

    let newInstance;
    for (let name of constrainFnNames) {
      newInstance = this[name](values, constrOpts);
      if (newInstance) break;
    }

    if (newInstance) {
      // const { _whitelist } = newBase;
      // const list = _whitelist && _whitelist.list;
      this.setInstance(newInstance);
      return newInstance;
    }

    this.warn("buildConstraint: missing value or values options");
    return false;
  }

  get constrainFnNames() {
    return [
      "multiValueConstraint",
      "presentConstraintValue",
      "nonPresentConstraintValue",
    ];
  }

  nonPresentConstraintValue(
    constraintValue,
    { constraintName, constraintFn, errFn }
  ) {
    if (isPresent(constraintValue)) return;

    this.onConstraintAdded({ name: constraintName });

    const newBase = constraintFn(errFn);
    return newBase;
  }

  presentConstraintValue(
    constraintValue,
    { constraintName, constraintFn, errFn }
  ) {
    if (!isPresent(constraintValue)) return;

    this.onConstraintAdded({ name: constraintName, value: constraintValue });

    if (this.isNoValueConstraint(constraintName)) {
      let specialNewBase = constraintFn(errFn);
      return specialNewBase;
    }

    // console.log("presentConstraintValue", { constraintName, constraintValue });
    const newBase = constraintFn(constraintValue, errFn);
    return newBase;
  }

  multiValueConstraint(values, { constraintFn, constraintName, errFn }) {
    if (!isPresent(values)) return;

    // call yup constraint function with multiple arguments
    if (!Array.isArray(values)) {
      this.warn("buildConstraint: values option must be an array of arguments");
      return;
    }

    this.onConstraintAdded({ name: constraintName, value: values });
    // console.log(constraintFn, { constraintName, values });

    return this.callConstraintFn(constraintFn, constraintName, values, errFn);
  }

  callConstraintFn(constraintFn, constraintName, values, errFn) {
    const isMulti = this.isMultiArgsCall(constraintName);
    // console.log({ constraintName, isMulti });
    // if (isMulti) {
    //   console.log(constraintName, ...values);
    // }
    return isMulti
      ? constraintFn(...values, errFn)
      : constraintFn(values, errFn);
  }

  isMultiArgsCall(constraintName) {
    return this.multiArgsValidatorMethods[constraintName];
  }

  get multiArgsValidatorMethods() {
    return (
      this.config.multiArgsValidatorMethods || {
        when: true,
      }
    );
  }

  isNoValueConstraint(constraintName) {
    return this.noValueConstraints.includes(constraintName);
  }

  get noValueConstraints() {
    return ["required", "email", "url", "format"];
  }

  addValueConstraint(propName, { constraintName, errName }: any = {}) {
    return this.addConstraint(propName, {
      constraintName,
      value: true,
      errName,
    });
  }

  addConstraint(propName, opts) {
    const constraint = this.build(propName, opts);
    if (constraint) {
      this.setInstance(constraint);
      // const { _whitelist } = constraint;
      // const list = _whitelist && _whitelist.list;
      return constraint;
    }
    return false;
  }

  onConstraintAdded({ name, value }: any) {
    this.constraintsAdded[name] = value;
    return this.handler;
  }

  get constraintsMap() {
    return {
      simple: ["required", "notRequired", "nullable"],
      value: ["default", "strict"],
    };
  }

  valErrMessage(msgName) {
    return this.errorMessageHandler.valErrMessage(msgName);
  }

  get aliasMap() {
    return {
      oneOf: "oneOf",
      enum: "oneOf",
      anyOf: "oneOf",
      // ...
    };
  }
}
