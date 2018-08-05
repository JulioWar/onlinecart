import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ServerService} from '../services/server.service';
import {FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  processing: boolean = false;
  error: string = '';
  form: FormGroup;
  model: any = {};

  constructor(private server: ServerService,
              private router: Router,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      'email': [
        null,
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      'password': [null, Validators.required]
    });
  }

  public onSubmit(value: any) {
    console.log('value', value);
    if (this.processing) return;

    this.processing = true;
    this.error = '';
    this.server.users().subscribe(
      (users: Array<any>) => {
        this.processing = false;
        const result: any = users.filter((user) => {
          return user && user.email == value.email && user.password == value.password;
        });
        if (result.length > 0) {
          localStorage.setItem('user', JSON.stringify(result[0]));
          this.router.navigate(['store']);
        } else {
          this.error = 'Error en el inicio de sesión';
        }
      },
      () => {
        this.processing = false;
        this.error = 'Error en la conexion al servidor.';
      }
    )
  }

}
