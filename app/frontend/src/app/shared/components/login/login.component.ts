import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any
  showEyeIcon = true
  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private _sharedService: SharedService,
    public translate: TranslateService
    ) { }

  get email(): any {
    return this.loginForm.get('email');
  }
  get password(): any {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(6), Validators.maxLength(16)]]
    })
  }

  toggleIcon() {
    this.showEyeIcon = !this.showEyeIcon
  }

  submitHandler() {
    console.log(this.loginForm.value)
    const userInfo =  {
      email : this.loginForm?.value?.email,
      password : this.loginForm?.value?.password
    };
    this._authService.loginUser(userInfo).subscribe((data) => {
      console.log(data);

      sessionStorage.setItem('accessToken', data.access);
      sessionStorage.setItem('refresh', data.refresh);
      sessionStorage.setItem('first_name', data.first_name);
      sessionStorage.setItem('email', userInfo.email);
      sessionStorage.setItem('user_id', data.user_id);
      sessionStorage.setItem('phone_number', data.phone_number);

      this._sharedService.handleSuccess(
        this.translate.instant('loginSuccessTitle_TC'),
        this.translate.instant('loginSuccessText_TC', {name : data.first_name ? data.first_name : userInfo.email})
      );
      this.router.navigateByUrl('\home');
    }, (error) => {
      console.log(error);
      this._sharedService.handleError(error);
    });
  }

}
