import { BaseDateConstraint } from "./base-date";

export const maxDate = (handler, opts) => new MaxDate(handler, opts);

export class MaxDate extends BaseDateConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    const { valErrMessageOr, constraints, helper } = this;
    const {
      toDate,
      transformToDate,
      isValidDateType,
      handleInvalidDate,
    } = helper;
    const maxDate = constraints.maxDate || constraints.max;
    if (this.isNothing(maxDate)) {
      return this;
    }
    const $maxDate = transformToDate(maxDate);
    if (!isValidDateType($maxDate)) {
      return handleInvalidDate("maxDate", $maxDate);
    }
    const errMsg = valErrMessageOr("maxDate", "max");
    return this.chain((x) => $maxDate && x.max(toDate($maxDate), errMsg));
  }
}
