import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [AuthService]
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = new FormControl('');
  constructor(private authSvc: AuthService , private router: Router) { }

  ngOnInit(): void {
  }
// tslint:disable-next-line: typedef
 async onReset(){
   try {
    const email = this.userEmail.value;
    this.authSvc.resetPassword(email);
    window.alert('Email Sent , Check Your Inbox!');
    // Redirect
    this.router.navigate(['/login']);
   } catch (error) {console.log(error); }
}
}
