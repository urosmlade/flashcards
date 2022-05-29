import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { UserInfo } from 'firebase/auth';
import { map, Observable, switchMap, take } from 'rxjs';
import { User } from '../services/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly userData$: Observable<UserInfo>; // Save logged in user data
  readonly uid$: Observable<string>;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */

    this.userData$ = this.afAuth.authState.pipe(
      map(
        (user) =>
          ({
            uid: user?.uid,
            displayName: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
          } as UserInfo)
      )
    );

    this.uid$ = this.userData$.pipe(map((user) => user.uid));

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  loadUserData(id: string) {
    this.uid$.pipe(
      take(1),
      switchMap((id) => this.afs.collection('users').get())
    );
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['flashcards']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  signUp(email: string, password: string, name: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user?.updateProfile({
          displayName: name,
        });
        this.setUserData(result.user, name);
        this.router.navigate(['/flashcards']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return Boolean(user.uid);
  }
  // Sign in with Google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['flashcards']);
      }
    });
  }
  // Auth logic to run auth providers
  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['flashcards']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any, name?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ?? name,
      photoURL: user.photoURL,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
