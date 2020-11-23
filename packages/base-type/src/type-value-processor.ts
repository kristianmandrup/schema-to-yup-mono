import { Loggable } from "@schema-to-yup/core";

export class TypeValueProcessor extends Loggable {
  handler: any;
  private _value: any;

  constructor(handler, config = {}) {
    super(config);
    this.handler = handler;
  }

  get typeModeSelector() {
    return this.handler.typeModeSelector;
  }

  get mixed() {
    return this.handler.mixed;
  }

  disabledMode(mode) {
    return this.typeModeSelector.disabledMode(mode);
  }

  isRequired(value) {
    return this.mixed.isRequired(value);
  }

  get shouldPreProcessValue() {
    return !this.disabledMode("notRequired");
  }

  preProcessedConstraintValue(value) {
    if (!this.shouldPreProcessValue) return value;

    if (!this.isRequired(value)) {
      return {
        ...value,
        notRequired: true,
      };
    }
    return value;
  }

  set value(value) {
    this._value = this.preProcessedConstraintValue(value);
  }

  get value() {
    return this._value;
  }
}
