import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @Output() emitter = new EventEmitter();

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  isUserLoggedIn() {
    return this._authService.checkLogin();
  }

  closeMenu() {
    this.emitter.emit(false);
  }

}
