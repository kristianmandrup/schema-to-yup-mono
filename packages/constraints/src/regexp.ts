import { Constraint } from "./base";
import { typeMatcher } from "@schema-to-yup/core";

function createRegExpConstraint(typer, map) {
  return new RegExpConstraint(typer, map);
}

class RegExpConstraint extends Constraint {
  constructor(typer, map?) {
    super(typer, map);
  }

  transform(value) {
    return this.toRegExp(value);
  }

  isValidConstraint(value) {
    return this.isRegExpLike(value);
  }

  toRegExp(value) {
    return new RegExp(value);
  }

  isRegExpLike(value) {
    return value instanceof RegExp || typeMatcher.isStringType(value);
  }

  get explainConstraintValidMsg() {
    return `Must be either a RegExp or String`;
  }
}

export { createRegExpConstraint, RegExpConstraint };
