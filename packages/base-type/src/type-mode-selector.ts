import { Loggable } from "@schema-to-yup/core";

export class TypeModeSelector extends Loggable {
  handler: any;

  constructor(handler, config) {
    super(config);
    this.handler = handler;
  }

  get mode() {
    return this.config.mode || {};
  }

  get disableFlags() {
    return [false, "disabled", "no", "off"];
  }

  get enableFlags() {
    return [true, "enabled", "yes", "on"];
  }

  disabledMode(modeName) {
    const modeEntry = this.mode[modeName];
    return !!this.disableFlags.find((disable) => modeEntry === disable);
  }

  enabledMode(modeName) {
    const modeEntry = this.mode[modeName];
    return !!this.enableFlags.find((disable) => modeEntry === disable);
  }
}
