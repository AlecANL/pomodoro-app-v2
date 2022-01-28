export interface IPomodoro {
  currentConfig: IDefault;
  config: {
    fonts: IConfig[];
    colors: IConfig[];
    timing: ITimingConfig[];
  };
}

export interface IConfigService {
  fonts: IConfig[];
  colors: IConfig[];
  timings: ITimingConfig[];
}

export interface IDefault {
  color: IConfig;
  font: IConfig;
  timing: ITimingConfig;
}

export interface ITimingConfig {
  name: string;
  value: number;
  longName: string;
}

export interface IConfig {
  name: string;
  value: string;
}
