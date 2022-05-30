import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '@auth/user';
import * as auth from 'firebase/auth';
import { UserInfo } from 'firebase/auth';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class AuthService {
  readonly userData$: Observable<UserInfo>;
  readonly uid$: Observable<string>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.userData$ = this.afAuth.authState.pipe(
      map(
        user =>
          ({
            uid: user?.uid,
            displayName: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL
          } as UserInfo)
      ),
      tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.setItem('user', 'null');
        }
      })
    );

    this.uid$ = this.userData$.pipe(map(user => user.uid));
  }

  signIn(email: string, password: string): Promise<void> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['flashcards']);
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  signUp(email: string, password: string, name: string): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user?.updateProfile({
          displayName: name
        });
        this.setUserData(result.user, name);
        this.router.navigate(['/flashcards']);
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  googleAuth(): Promise<void> {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['flashcards']);
      }
    });
  }

  authLogin(provider: any): Promise<void> {
    return this.afAuth
      .signInWithPopup(provider)
      .then(result => {
        this.router.navigate(['flashcards']);
        this.setUserData(result.user);
      })
      .catch(error => {
        window.alert(error);
      });
  }

  setUserData(user: any, name?: string): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ?? name,
      photoURL: user.photoURL
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
