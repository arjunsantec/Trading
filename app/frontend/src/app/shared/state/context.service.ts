import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  applicationConfig: any;
  layerConfig: any;

  constructor() { }

  getApplicationConfig() {
    return this.applicationConfig;
  }

  setApplicationConfig(appConfig: any) {
    this.applicationConfig = new Map(Object.entries(appConfig));
  }

  getLayerConfig() {
    return this.layerConfig;
  }

  getLayerConfigById(id: string) {
    if(this.layerConfig && this.layerConfig.get(id)) {
      return this.layerConfig.get(id);
    }
    return null;
  }

  setLayerConfig(layerConfig: any) {
    if(this.layerConfig?.size > 0) {
      this.layerConfig = new Map([...this.layerConfig, ...Object.entries(layerConfig)])
    } else {
      this.layerConfig = new Map(Object.entries(layerConfig))
    }
  }
}
