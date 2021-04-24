import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb : FormBuilder,
    private authService : AuthService
  ) { }

  public registerForm : FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name : ["", [Validators.required]],
      email : ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      terms: [null, [Validators.requiredTrue]]
    })
  }

  submit(){
    let name = this.value.name;
    let email : string = this.value.email;
    let password : string = this.value.password;

    this.authService.register(name, email, password)
    .then(res => {
      alert("Bienvenido Muchacho");
    })
    .catch(error => {
      console.log(error);
    })
  }

  get value(){
    return this.registerForm.value;
  }
}
