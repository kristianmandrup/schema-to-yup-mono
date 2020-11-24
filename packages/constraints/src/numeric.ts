import { Constraint } from "./base";
import { typeMatcher } from "@schema-to-yup/core";

function createNumericConstraint(typer, map) {
  return new NumericConstraint(typer, map);
}

class NumericConstraint extends Constraint {
  constructor(typer, map?) {
    super(typer, map);
  }

  transform(value) {
    return typeMatcher.toNumber(value);
  }

  isValidConstraint(value) {
    return typeMatcher.isNumberLike(value);
  }

  get explainConstraintValidMsg() {
    return `Must be a number or convertible to a number`;
  }
}

export { createNumericConstraint, NumericConstraint };
