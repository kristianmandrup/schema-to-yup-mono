import { BaseTypeConstraintsProcessor } from "@schema-to-yup/base-type";
import { factories, classMap, constraints } from "./maps";

export class DateConstraintsProcessor extends BaseTypeConstraintsProcessor {
  constructor(opts = {}) {
    super(opts);
  }

  maps() {
    return {
      factories,
      classMap,
      constraints,
    };
  }
}
