type LogLevel = "info" | "warn" | "error";

function timestamp() {
  return new Date().toISOString();
}

function format(level: LogLevel, context: string, message: string, data?: unknown) {
  const prefix = `[${timestamp()}] [${level.toUpperCase()}] [${context}]`;
  if (data !== undefined) {
    return `${prefix} ${message} ${JSON.stringify(data, null, 0)}`;
  }
  return `${prefix} ${message}`;
}

function createLogger(context: string) {
  return {
    info: (message: string, data?: unknown) =>
      console.log(format("info", context, message, data)),
    warn: (message: string, data?: unknown) =>
      console.warn(format("warn", context, message, data)),
    error: (message: string, data?: unknown) =>
      console.error(format("error", context, message, data)),
  };
}

export const log = {
  db: createLogger("DB"),
  leads: createLogger("LEADS"),
  email: createLogger("EMAIL"),
  auth: createLogger("AUTH"),
  admin: createLogger("ADMIN"),
};
