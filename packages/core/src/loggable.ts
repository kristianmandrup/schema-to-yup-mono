export class Loggable {
  config: any;
  enable: any;
  log: any;
  err: any;

  constructor(config: any = {}) {
    this.config = config;
    const { log, error } = config;
    const enable = config.enable || {};
    this.enable = enable;
    // what type of logger to use
    this.log = typeof log === "function" ? log : console.log;
    this.err = typeof error === "function" ? error : console.error;
  }

  stringify(data) {
    return JSON.stringify(data);
  }

  error(errMsg: string, value?: any) {
    // only disable if directly disabled
    if (this.enable.error === false) return;
    this.err && (value ? this.err(errMsg, value) : this.err(errMsg));
    throw errMsg;
  }

  warn(warnMsg: string, value?: any) {
    if (!this.enable.warn) return;
    this.logInfo("WARNING: " + warnMsg, value);
  }

  logInfo(name: string, value?: any) {
    if (!this.enable.log) return;
    this.log && (value ? this.log(name, value) : this.log(name));
  }
}
