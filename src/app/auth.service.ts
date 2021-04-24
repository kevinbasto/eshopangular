import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth : AngularFireAuth,
    private afs : AngularFirestore
  ) { 

    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  public user$ : Observable<any>;

  emailLogin(email : string, password : string) : Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      })
      .catch(error => reject(error))
    })
  }

  async register(name : string, email : string, password : string){
    try{
      return await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(register => {
        this.afs.collection('users').doc(register.user?.uid).set({
          username: name,
          email: email,
          level: 1,
          banned: false
        });
      });
    }
    catch(error){
      throw error;
    }
  }
}
