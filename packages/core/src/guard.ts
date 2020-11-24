import { Base } from "./base";
import { typeMatcher } from "./type-matcher";

export class Guard extends Base {
  obj: any;

  constructor(obj, config) {
    super(config);
    this.obj = obj;
  }

  isValid(_: any) {
    return false;
  }

  verify() {
    return typeMatcher.isPresent(this.obj) && this.isValid(this.obj);
  }
}
