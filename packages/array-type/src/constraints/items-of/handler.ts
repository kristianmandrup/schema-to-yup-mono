import { typeMatcher } from "@schema-to-yup/core";
import { BaseTypeConstraint } from "@schema-to-yup/base-type";

export const itemsOf = (opts) => new ItemsOf(opts);

export class ItemsOf extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  validate(itemsOf) {
    if (Array.isArray(itemsOf)) {
      this.error("itemsOf", "does not (yet) support an Array of schemas");
      return;
    }

    if (!typeMatcher.isObjectType(itemsOf)) {
      this.error("itemsOf", `must be a schema object, was ${typeof itemsOf}`);
      return;
    }

    if (!this.createYupSchemaEntry) {
      this.warn(
        "missing createYupSchemaEntry in config, needed for recursive validation"
      );
      return;
    }
    return true;
  }

  process() {
    const {
      createSchema,
      constraints,
      validate,
      createYupSchemaEntry,
      addConstraint,
      error,
    } = this;
    let { items, itemsOf } = constraints;
    itemsOf = items || itemsOf || constraints.of;

    if (typeMatcher.isNothing(itemsOf)) return;
    if (!validate(itemsOf)) return;

    try {
      const schemaConf = createSchema({ itemsOf });
      const schemaEntry = createYupSchemaEntry(schemaConf);

      return addConstraint("of", {
        constraintValue: schemaEntry,
        propValue: itemsOf,
      });
    } catch (ex) {
      error(`itemsOf: Error - ${itemsOf}`, ex);
    }
    return this;
  }

  createSchema({ itemsOf }) {
    return {
      key: this.key,
      value: itemsOf,
      config: this.config,
    };
  }
}
