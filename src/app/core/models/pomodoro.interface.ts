export interface IPomodoro {
  currentConfig: IDefault;
}

export interface IConfigService {
  fonts: IConfig[];
  colors: IConfig[];
  timings: ITimingConfig[];
}

export interface IDefault {
  color: IShortConfig;
  font: IShortConfig;
  timing: ITimingConfig;
}

export interface ITimingConfig {
  name: string;
  value: number;
  longName: string;
}

export interface IShortConfig {
  value: string;
}

export interface IConfig {
  name: string;
  value: string;
}
