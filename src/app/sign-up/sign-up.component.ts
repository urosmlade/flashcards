import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  readonly signUpForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.signUpForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl,
      name: this.nameControl,
    });
  }

  ngOnInit() {}

  signUpWithEmailAndPassword() {
    this.authService.signUp(
      this.emailControl.value,
      this.passwordControl.value,
      this.nameControl.value
    );
  }

  googleAuth() {
    this.authService.googleAuth();
  }

  private readonly emailControl = new FormControl(undefined);
  private readonly passwordControl = new FormControl(undefined);
  private readonly nameControl = new FormControl(undefined);
}
