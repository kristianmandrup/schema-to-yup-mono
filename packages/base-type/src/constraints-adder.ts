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

  set base(inst) {
    this.handler.base = inst;
  }

  init() {
    this.setClassMap(defaults);
    const constraintBuilderFactoryFn =
      this.config.createConstraintBuilder || this.createConstraintBuilder;
    this.constraintBuilder = constraintBuilderFactoryFn(this, this.config);
  }

  getConstraints() {
    return this.config.getConstraints(this.value);
  }

  createConstraintBuilder(typeHandler, config = {}) {
    return new this.classMap.ConstraintBuilder(typeHandler, config);
  }

  addValueConstraint(propName, opts) {
    const constraint = this.constraintBuilder.addValueConstraint(
      propName,
      opts
    );
    if (constraint) {
      const { base } = constraint;
      this.base = base;
    }
    return this;
  }

  addConstraint(propName, opts) {
    const constraint = this.constraintBuilder.addConstraint(propName, opts);
    if (constraint) {
      this.base = constraint;
    }
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
