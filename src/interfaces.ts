import { Chalk } from "chalk";

/**
 * All possible log levels
 * @public
 */
export interface ILogLevel {
  0: "silly";
  1: "trace";
  2: "debug";
  3: "info";
  4: "warn";
  5: "error";
  6: "fatal";
}

/**
 * Log level IDs (0 - 6)
 * @public
 */
export type TLogLevelId = keyof ILogLevel;

/**
 * Log level names (sill - fatal)
 * @public
 */
export type TLogLevelName = ILogLevel[TLogLevelId];

/**
 * Hex colors of different log levels
 * @public
 */
export type TLogLevelColor = {
  [key in TLogLevelId]: string;
};

/**
 * Constructor: logger settings
 * all values are optional and will be pre-filled with default values
 * @public
 */
export interface ISettingsParam {
  /** Name of the instance name, default: host name */
  instanceName?: string;

  /** Display instanceName or not, default: false */
  displayInstanceName?: boolean;

  /** Name of the logger instance, default: empty string */
  name?: string;

  /** Minimum output log level (e.g. debug), default: silly */
  minLevel?: TLogLevelName;

  /** Print log as stringified json instead of pretty, default: false */
  logAsJson?: boolean;

  /** Expose stack with EVERY log message, default: false  */
  exposeStack?: boolean;

  /** Suppress any log output to std out / std err */
  suppressLogging?: boolean;

  /** Catch logs going to console (e.g. console.log). Last instantiated Log instance wins */
  overwriteConsole?: boolean;

  /**  Overwrite colors of log messages of different log levels */
  logLevelsColors?: TLogLevelColor;

  /**  Overwrite colors json highlighting */
  jsonHighlightColors?: IJsonHighlightColors;

  /**  Overwrite default std out */
  stdOut?: IStd;

  /**  Overwrite default std err */
  stdErr?: IStd;
}

/**
 * The actual settings object
 * Based on ISettingsParam, however pre-filled with defaults in case no value was provided.
 * @public
 */
export interface ISettings extends ISettingsParam {
  instanceName?: string;
  displayInstanceName?: boolean;
  name: string;
  minLevel: TLogLevelName;
  logAsJson: boolean;
  exposeStack: boolean;
  suppressLogging: boolean;
  overwriteConsole: boolean;
  logLevelsColors: TLogLevelColor;
  jsonHighlightColors: IJsonHighlightColors;
  stdOut: IStd;
  stdErr: IStd;
}

/**
 * StdOut and StdErr have to implement a write function (e.g. Stream)
 * @public
 */
export interface IStd {
  /** stream.Writable */
  write: Function;
}

/**
 * All relevant information about a log message
 * @public
 */
export interface IStackFrame {
  /** Relative path based on the main folder */
  filePath: string;
  /** Full path */
  fullFilePath: string;
  /** Name of the file */
  fileName: string;
  /** Line number */
  lineNumber: number | null;
  /** Column Name */
  columnNumber: number | null;
  /** Called from constructor */
  isConstructor: boolean | null;
  /** Name of the function */
  functionName: string | null;
  /** Name of the class */
  typeName: string | null;
  /** Name of the Method */
  methodName: string | null;
}

/**
 * All relevant information about a log message.
 * @public
 */
export interface ILogObject extends IStackFrame {
  /**  Optional name of the instance this application is running on. */
  instanceName?: string;
  /**  Name of the logger or empty string. */
  loggerName: string;
  /**  Timestamp */
  date: Date;
  /**  Log level name (e.g. debug) */
  logLevel: TLogLevelName;
  /**  Log level ID (e.g. 3) */
  logLevelId: TLogLevelId;
  /**  Log arguments */
  argumentsArray: (IErrorObject | unknown)[];
  /**  Optional Log stack trace */
  stack?: IStackFrame[];
}

/**
 * Object representing an error with a stack trace
 * @public
 */
export interface IErrorObject {
  /** Is this object an error? */
  isError: true;
  /** Name of the error*/
  name: string;
  /** Error message */
  message: string;
  /** Stack trace of the error */
  stack: IStackFrame[];
}

/**
 * List of attached transport logger with their respective min log level.
 * @public
 */
export type TTransportLogger<T> = {
  [key in TLogLevelName]: T;
};

export interface ITransportProvider {
  minLevel: TLogLevelName;
  transportLogger: TTransportLogger<(message: ILogObject) => void>;
}

/**
 * Hex color values for JSON highlighting.
 * @public
 */
export interface IJsonHighlightColors {
  number: string;
  key: string;
  string: string;
  boolean: string;
  null: string;
}

export interface IJsonHighlightColorsChalk {
  number: Chalk;
  key: Chalk;
  string: Chalk;
  boolean: Chalk;
  null: Chalk;
}
