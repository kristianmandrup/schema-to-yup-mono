import { BaseTypeConstraint } from "@schema-to-yup/base-type";
import { createWhenCondition } from "@schema-to-yup/conditions";
import { typeMatcher } from "@schema-to-yup/core";

export const when = (handler, opts) => new When(handler, opts);

export class When extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  get schema() {
    return this.handler.schema;
  }

  get properties() {
    return this.handler.properties;
  }

  process() {
    const when = this.constraints.when;
    if (!typeMatcher.isObjectType(when)) return this;
    const { constraint } = this.createWhenConditionFor(when);

    if (!constraint) {
      this.warn(`Invalid when constraint for: ${when}`);
      return this;
    } else {
      this.logInfo(`Adding when constraint for ${this.key}`, constraint);
      // use buildConstraint or addConstraint to add when constraint (to this.base)

      this.addConstraint("when", { values: constraint, errName: "when" });
    }
    return this;
  }

  createWhenConditionFor(when) {
    const opts = {
      key: this.key,
      type: this.type,
      value: this.value,
      schema: this.schema,
      properties: this.properties,
      config: this.config,
      when,
    };

    const $createWhenCondition =
      this.config.createWhenCondition || createWhenCondition;

    return $createWhenCondition(opts);
  }
}
