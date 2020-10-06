import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { ignoreElements } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [AuthService]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password : new FormControl('')
  });
  constructor(private authSvc: AuthService , private router: Router) { }
  // tslint:disable-next-line: typedef
  async onGoogleLogin(){
     try {
      const user = await this.authSvc.loginGoogle();
      if (user && user.user.emailVerified){
        // Redirect to homepage
        this.router.navigate(['/home']);

      }
     } catch (error) { console.log(error); }
   }
  ngOnInit(): void {
  }
   // tslint:disable-next-line: typedef
    async onLogin(){
     const {email, password} = this.loginForm.value;
     try{
       const user = await this.authSvc.login(email , password);
       if (user && user.user.emailVerified){
         // Redirect to homepage
         this.router.navigate(['/home']);

       } else if (user){
         this.router.navigate(['/verification-email']);
       } else {
         this.router.navigate(['/register']);
       }
     }
     catch (error){console.log(error); }
   }
}
