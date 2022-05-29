import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  readonly signInForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.signInForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }

  ngOnInit(): void {}

  signInWithUsernameAndPassword() {
    this.authService.signIn(
      this.emailControl.value,
      this.passwordControl.value
    );
  }

  googleAuth() {
    this.authService.googleAuth().then(() => {
      this.router.navigate(['/flashcards']);
    });
  }

  private readonly emailControl = new FormControl(undefined);
  private readonly passwordControl = new FormControl(undefined);
}
