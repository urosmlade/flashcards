import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  goToProfile(): void {
    this.subsink.add(
      this.authService.uid$
        .pipe(take(1))
        .subscribe(id => this.router.navigate(['user', id]))
    );
  }

  private readonly subsink = new Subscription();
}
