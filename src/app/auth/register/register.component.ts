import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppValdiators } from '../validators/app.validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:AuthService, private router:Router) { }

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    confirmPassword: new FormControl('',[Validators.required, AppValdiators.passwordsShouldMatch])
  })

  errorMessage = null

  ngOnInit() {
  }

  onButtonClicked(){
    console.log(this.form.value)
    this.service.register(JSON.stringify(this.form.value))
        .subscribe(res => {
          this.router.navigateByUrl('/login')
        }, err => {
          this.errorMessage = err.error.message
        })
  }

  get email(){ return this.form.get('email')}
  get password(){ return this.form.get('password')}
  get confirmPassword(){ return this.form.get('confirmPassword')}

}
