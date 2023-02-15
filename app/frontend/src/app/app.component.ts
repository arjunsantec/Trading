import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from './core/services/core.service';
import { SharedService } from './shared/services/shared.service';
import { ContextService } from './shared/state/context.service';
import { PageConstants } from './shared/utils/page.constants';
import { StaticURLConstants } from './shared/utils/static-url.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isInitialConfigLoaded: boolean = false;

  constructor(private _sharedService: SharedService,
    private _contextService: ContextService,
    public translate: TranslateService) {
      this.initialiseAppliction();
  }

  initialiseAppliction() {
    this.translateSetup();
    this.getApplicationConfig();
  }

  translateSetup() {
    this.translate.addLangs(['en', 'ka']);
    if (localStorage.getItem('language')) {
      this.translate.setDefaultLang(localStorage.getItem('language'));
    } else {
      this.translate.setDefaultLang('en');
    }
  }

  getApplicationConfig() {
    this._sharedService.getJSON(StaticURLConstants.APPLICATION_CONFIG).subscribe(
      (response) => {
        if(response) {
          this.setApplicationContext(response);
          this.isInitialConfigLoaded = true;
        }
      }
    );
  }

  setApplicationContext(appConfig: any) {
    if(appConfig) {
      this._contextService.setApplicationConfig(appConfig);
      if(appConfig?.LayerConfig) {
        this._contextService.setLayerConfig(appConfig?.LayerConfig);
      }
    }
  }

}
