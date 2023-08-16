import type { AxiosInstance } from 'axios';

export class ApiInstance {
  protected instance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  setAuthHeader(key: string, value: string) {
    delete this.instance.defaults.headers[key];
    delete this.instance.defaults.headers.common[key];
    this.instance.defaults.headers.common[key] = value;
  }
}
