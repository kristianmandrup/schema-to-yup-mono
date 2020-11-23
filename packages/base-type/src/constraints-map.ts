import {
  ArrayConstraints,
  DateConstraints,
  ObjectConstraints,
  StringConstraints,
  NumberConstraints,
  MixedConstraints,
} from "@schema-to-yup/types";

// new constraintsMap.string.Processor(handler, opts)

export const constraintsMap = {
  mixed: MixedConstraints,
  string: StringConstraints,
  number: NumberConstraints,
  object: ObjectConstraints,
  date: DateConstraints,
  array: ArrayConstraints,
};
