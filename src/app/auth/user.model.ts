export class User {
  constructor(
    readonly uid: string,
    readonly email: string,
    readonly displayName: string,
    readonly photoURL: string
  ) {}
}
