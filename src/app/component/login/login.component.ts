import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthResponseData, AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  isLoginMode = true;
  isLoading = false;
  error = null;
  
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode; 
  }

  onSubmit(form: NgForm) {
    if (!this.isLoginMode) {
      this.router.navigate(['/signup']);
    } else {
      this.authService.login(form.value.email, form.value.password)
      .subscribe((res) => {
        console.log(res)
        this.isLoading = false;
        this.router.navigate(['/student']);
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });
    }
    form.reset();
  }

}
