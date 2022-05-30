import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth/service/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  readonly signUpForm: FormGroup;

  constructor(private readonly authService: AuthService) {
    this.signUpForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl,
      name: this.nameControl
    });
  }

  signUpWithEmailAndPassword(): void {
    this.authService.signUp(
      this.emailControl.value,
      this.passwordControl.value,
      this.nameControl.value
    );
  }

  googleAuth(): void {
    this.authService.googleAuth();
  }

  private readonly emailControl = new FormControl(undefined);
  private readonly passwordControl = new FormControl(undefined);
  private readonly nameControl = new FormControl(undefined);
}
