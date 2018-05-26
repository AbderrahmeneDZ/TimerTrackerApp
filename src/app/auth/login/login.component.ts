import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppValdiators } from '../validators/app.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:AuthService, private route:Router) { }

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  errorMessage = null
  ngOnInit() {
    if(this.service.isLogin)
      this.route.navigateByUrl('/')
  }

  onButtonClicked(){
    this.service.login(JSON.stringify(this.form.value))
      .subscribe(res => {
        this.route.navigateByUrl('/')
      }, err => {
        this.errorMessage = err.error.message
      })
  }

  get email(){ return this.form.get('email')}
  get password(){ return this.form.get('password')}

}
