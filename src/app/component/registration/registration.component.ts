import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';

interface Student {
  name: string,
  email: string,
  phone: string,
  address: string,
  password: string
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  isLoading = false;
  error = null;

  onSubmit(form: NgForm) {
    if(!form.valid) {
      console.log('da');
      return;
    }
    this.isLoading = true;
    const studentPayload = {
      name: form.value.sname,
      email: form.value.email,
      phone: form.value.phone,
      address: form.value.address,
      password: form.value.password
    };
    this.auth.signUp(studentPayload).subscribe((res) => {
      console.log(res)
      this.isLoading = false;
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    });
    // form.reset();
  }

}
