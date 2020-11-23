import { ArrayGuard } from "./guard";

export function toYupArray(obj, config = {}) {
  return obj && new ArrayGuard(obj, config).handle();
}

export { YupArray } from "./array";
export * as ArrayConstraints from "./constraints";
