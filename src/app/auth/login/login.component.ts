import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    })
  }

  submit(){
    let email : string = this.form.email;
    let password : string = this.form.password;

    this.authService.emailLogin(email, password)
    .then(res => {
      console.log("bienvenido");
    })
    .catch(error => {
      console.log(error);
    })
  }

  get form(){
    return this.loginForm.value;
  }
}
