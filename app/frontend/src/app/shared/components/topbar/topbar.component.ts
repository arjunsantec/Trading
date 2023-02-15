import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ContextService } from '../../state/context.service';
import { CommonConstants } from '../../utils/common.constants';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

  display: boolean = false;
  themeSelected: string = CommonConstants.LIGHT_THEME;
  themeIcon: string = 'pi-moon';
  themeTitle: string = this.translate.instant('darkThemeTooltip_SC');
  fontmenulist: MenuItem[] = [];
  selectedCode: number = 1;
  langmenulist: MenuItem[] = [];
  scales: number[] = [12, 13, 14, 15, 16, 17, 18];
  scaleIndex: number = 2;
  appTitle: string | null = '';

  langChangeSubscription: Subscription = new Subscription();

  constructor(
    private _contextService: ContextService,
    public translate: TranslateService,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event) => {
      this.initialiseScaleFontList();
      this.setAvailableLocales();
      this.themeTitle = (this.themeSelected === CommonConstants.LIGHT_THEME) ? this.translate.instant('darkThemeTooltip_SC') : this.translate.instant('lightThemeTooltip_SC');
    });
    this.initialiseScaleFontList();
    this.initialiseLocaleList();
    this.initialiseTopBar();
    this.setAppTitle();
  }

  initialiseTopBar() {
    this.setAvailableLocales();
  }

  initialiseScaleFontList() {
    this.fontmenulist = [{
      label: this.translate.instant('scaleFont_TC'),
      items: [{
          label: this.translate.instant('sacalePlus_TC'),
          command: () => {
              this.incrementScale();
          }
      },
      {
        label: this.translate.instant('sacaleMinus_TC'),
          command: () => {
              this.decrementScale();
          }
      }
      ]}
  ];

  }

  initialiseLocaleList() {
    this.langmenulist = [{
        label: 'Available Languages',
        items: [{
            label: 'English',
            command: () => {
                this.switchLang('en');
            }
        }]
      }
    ];
  }

  setAvailableLocales() {
    const availableLocales = this._contextService.getApplicationConfig()?.get(CommonConstants.AVAILABLE_LOCALES);
    if(availableLocales && availableLocales.length > 1) {
      this.langmenulist[0].label = this.translate.instant('availableLanguages_TC');
      this.langmenulist[0].items = [];
      availableLocales.forEach((locale: any) => {
        const availableLocale = {
          label: locale?.name,
          command: () => {
            localStorage.setItem('language', locale?.id)
              this.switchLang(locale?.id);
          }
        }
        this.langmenulist[0].items?.push(availableLocale);
      });
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  onThemeChange() {
    this.themeSelected = (this.themeSelected === CommonConstants.LIGHT_THEME) ? CommonConstants.DARK_THEME: CommonConstants.LIGHT_THEME
    this.themeIcon = (this.themeSelected === CommonConstants.LIGHT_THEME) ? 'pi-moon' : 'pi-sun';
    this.themeTitle = (this.themeSelected === CommonConstants.LIGHT_THEME) ? this.translate.instant('darkThemeTooltip_SC') : this.translate.instant('lightThemeTooltip_SC');
    const linkTag: any = document.getElementById('themeSelected');
    if (linkTag) {
      linkTag.href = (this.themeSelected === CommonConstants.LIGHT_THEME) ? 'assets/theme/light.css' : 'assets/theme/dark.css';
    }
  }

  decrementScale() {
    if(this.scaleIndex < this.scales.length && this.scaleIndex > 0) {
      this.scaleIndex--;
    }
    this.applyScale();
}

  incrementScale() {
    if(this.scaleIndex < (this.scales.length -1) && this.scaleIndex >= 0) {
      this.scaleIndex++;
    }
      this.applyScale();
  }

  applyScale() {
      document.documentElement.style.fontSize = this.scales[this.scaleIndex] + 'px';
  }

  isUserLoggedIn() {
    return this._authService.checkLogin();
  }

  logout() {
    this._authService.logout();
  }

  setAppTitle(){
    this.appTitle = sessionStorage.getItem('companyName');
  }
  
  ngOnDestroy() {
    if(this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  closeMenu(eventData: Boolean) {
    this.display = false;
  }
}
