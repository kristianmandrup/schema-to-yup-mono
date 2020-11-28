import { Base } from "@schema-to-yup/core";
import { ConstraintBuilder } from "./constraint-builder";

const defaults = {
  classMap: {
    ConstraintBuilder,
  },
};

export class ConstraintsAdder extends Base {
  constraintBuilder: any;
  handler: any;

  constructor(handler, opts: any = {}) {
    super(opts);
    this.handler = handler;
    this.config = opts.config || {};
    this.init();
  }

  get value() {
    return this.handler.value;
  }

  set setInstance(inst) {
    this.handler.instance = inst;
  }

  init() {
    this.setClassMap(defaults);
    this.buildConstraintBuilder();
  }

  getConstraints() {
    return this.config.getConstraints(this.value);
  }

  buildConstraintBuilder() {
    const constraintBuilderFactoryFn =
      this.config.createConstraintBuilder || this.createConstraintBuilder;
    this.constraintBuilder = constraintBuilderFactoryFn(this, this.config);
  }

  createConstraintBuilder(typeHandler, config = {}) {
    return new this.classMap.ConstraintBuilder(typeHandler, config);
  }

  addValueConstraint(propName, opts) {
    const constraint = this.constraintBuilder.addValueConstraint(
      propName,
      opts
    );
    return this.setConstraint(constraint);
  }

  addConstraint(propName, opts) {
    const constraint = this.constraintBuilder.addConstraint(propName, opts);
    return this.setConstraint(constraint);
  }

  setConstraint(constraint) {
    if (!constraint) return;
    this.setInstance(constraint.instance);
    return this;
  }

  addMappedConstraints() {
    // contains different types of constraints (ie. name -> yup constraint function calls)
    const keys = Object.keys(this.constraintsMap);
    const fn = this.addMappedConstraint.bind(this);
    keys.map(fn);
    return this;
  }

  addMappedConstraint(key) {
    const { constraintsMap } = this;
    const constraintNames = constraintsMap[key];
    const fnName = key === "value" ? "addValueConstraint" : "addConstraint";
    const fn: any = this[fnName];
    constraintNames.map((constraintName) => {
      fn(constraintName);
    });
  }

  get constraintsMap() {
    return {
      simple: ["required", "notRequired", "nullable"],
      value: ["default", "strict"],
    };
  }
}
