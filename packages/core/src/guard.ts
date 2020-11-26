import { Base } from "./base";
import { typeMatcher } from "./type-matcher";

export class BaseGuard extends Base {
  obj: any;

  constructor(propertySchema, config) {
    super(propertySchema, config);
    this.propertySchema = propertySchema;
  }

  isValid(_: any) {
    return false;
  }

  verify() {
    return typeMatcher.isPresent(this.obj) && this.isValid(this.obj);
  }
}
