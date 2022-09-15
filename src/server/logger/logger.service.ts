import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST,
})
export class LoggerService extends Logger {
  log(message: any) {
    super.log(message);
  }

  verbose(message: any) {
    super.verbose(message);
  }

  error(message: any) {
    super.error(message);
  }

  warn(message: any) {
    super.warn(message);
  }

  debug(message: any) {
    super.debug(message);
  }

  setContext(loggerContext: any) {
    super.context = loggerContext;
  }
}
