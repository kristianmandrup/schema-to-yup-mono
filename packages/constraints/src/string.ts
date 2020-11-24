import { Constraint } from "./base";
import { typeMatcher } from "@schema-to-yup/core";

function createStringConstraint(typer, map) {
  return new StringConstraint(typer, map);
}

class StringConstraint extends Constraint {
  constructor(typer, map?) {
    super(typer, map);
  }

  isValidConstraint(value) {
    return typeMatcher.isStringType(value);
  }

  get explainConstraintValidMsg() {
    return `Must be a String`;
  }
}

export { createStringConstraint, StringConstraint };
