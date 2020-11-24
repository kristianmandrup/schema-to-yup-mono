import { typeMatcher, Loggable } from "@schema-to-yup/core";

class Constraint extends Loggable {
  map: any;
  typer: any;

  constructor(typer, map?) {
    super(typer.config);
    this.map = map || {};
    this.typer = typer;
  }

  get addConstraint() {
    return this.typer.addConstraint;
  }

  get constraints() {
    return this.typer.constraints;
  }

  get constraintsAdded() {
    return this.typer.constraintsAdded;
  }

  add() {
    Object.keys(this.map).map((yupMethod: string) => {
      const names = this.entryNames(this.map[yupMethod]);
      this.addConstraints(yupMethod, names);
    });
  }

  entryNames(entry) {
    return Array.isArray(entry) ? entry : [entry];
  }

  addConstraints(method, names) {
    names.map((name) => {
      const value = this.validateAndTransform(name);
      this.addConstraint(name, { method, value });
    });
    return this;
  }

  //override
  transform(cv) {
    return cv;
  }

  validateAndTransform(name) {
    const cv = this.constraints[name];
    this.validate(cv);
    return this.transform(cv);
  }

  invalidMsg(name, value) {
    return `invalid constraint for ${name}, was ${value}.`;
  }

  get explainConstraintValidMsg() {
    return "";
  }

  invalidConstraintMsg(name, value) {
    return [this.invalidMsg(name, value), this.explainConstraintValidMsg].join(
      "\n"
    );
  }

  validate(cv) {
    if (typeMatcher.isNothing(cv)) {
      return this;
    }
    if (!this.isValidConstraint(cv)) {
      return this.handleInvalidConstraint(name, cv);
    }
    return this;
  }

  // override
  isValidConstraint(_) {
    return true;
  }

  handleInvalidConstraint(name, value) {
    const msg = this.invalidConstraintMsg(name, value);
    if (this.config.warnOnInvalid) {
      this.warn(msg);
      return this;
    }
    this.error(msg, value);
    return this;
  }
}

export { Constraint };
