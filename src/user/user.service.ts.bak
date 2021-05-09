import { Injectable, Scope } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private users: UserDto[] = [
    new UserDto('yeum', '염규완'),
    new UserDto('kim', '김연아'),
  ];

  findAll(): Promise<UserDto[]> {
    return new Promise((resolve) => setTimeout(() => resolve(this.users), 100));
  }

  findOne(id: string): UserDto | { msg: string } {
    const user = this.users.filter((u) => u.userId === id);
    return user.length ? user[0] : { msg: 'nothing' };
  }

  saveUser(user: UserDto): void {
    this.users = [...this.users, user];
  }
}
