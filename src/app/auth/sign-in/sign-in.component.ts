import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  readonly signInForm: FormGroup;

  constructor(private readonly authService: AuthService) {
    this.signInForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });
  }

  signInWithUsernameAndPassword(): void {
    this.authService.signIn(
      this.emailControl.value,
      this.passwordControl.value
    );
  }

  googleAuth(): void {
    this.authService.googleAuth();
  }

  private readonly emailControl = new FormControl(undefined, [
    Validators.required
  ]);
  private readonly passwordControl = new FormControl(undefined, [
    Validators.required
  ]);
}
