import { Injectable } from '@angular/core';
import {auth} from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User} from 'firebase';
import { first} from 'rxjs/operators';
@Injectable()
export class AuthService {
  public user: User;

  constructor(public afAuth: AngularFireAuth) { }
   // tslint:disable-next-line: typedef
   async loginGoogle(){
     try {
       return this.afAuth.signInWithPopup( new auth.GoogleAuthProvider());
     } catch (error) {console.log(error); }
   }

  async resetPassword(email: string): Promise<void>{
    try{
    return this.afAuth.sendPasswordResetEmail(email);
    }
    catch (error){console.log(error); }

  }

  // tslint:disable-next-line: typedef
  async sendVerificationEmail(): Promise<void>{
    return await (await this.afAuth.currentUser).sendEmailVerification();
  }
  // tslint:disable-next-line: typedef
  async login(email: string , password: string){
   try{
    const result = await this.afAuth.signInWithEmailAndPassword(email , password);
    return result;
   }
   catch (error){console.log(error);
  }
  }
  // tslint:disable-next-line: typedef
 async register(email: string , password: string){
   try{
    const result = await this.afAuth.createUserWithEmailAndPassword(email , password);
    this.sendVerificationEmail();
    return result;
   }
   catch (error){
     console.log(error);
   }

  }
  // tslint:disable-next-line: typedef
  async logout(){
    try{
      await this.afAuth.signOut();
    }
    catch (error){console.log(error); }

  }
  // tslint:disable-next-line: typedef

}
