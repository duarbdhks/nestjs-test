export class UserDto {
  private _userId: string;
  private _userName: string;

  constructor(userID: string, userName: string) {
    this._userId = userID;
    this._userName = userName;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(v: string) {
    this._userId = v;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(v: string) {
    this._userName = v;
  }
}
