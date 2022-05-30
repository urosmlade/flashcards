import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from 'firebase/auth';
import { combineLatest, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  @Input() user?: UserInfo | null;

  readonly isOwnProfile$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute
  ) {
    this.isOwnProfile$ = combineLatest([
      this.authService.uid$,
      this.route.params.pipe(map((p) => p.id)),
    ]).pipe(
      map(([uid, id]) => {
        if (!id) {
          return true;
        }

        if (uid === id) {
          return true;
        }

        return false;
      })
    );
  }

  ngOnInit(): void {}

  signOut() {
    this.authService.signOut();
  }
}
