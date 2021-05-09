import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Redirect,
  Scope,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { TestService } from '../test/test.service';
import { User } from './domain/User';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private testService: TestService,
  ) {
    this.userService = userService;
    this.testService = testService;
  }

  @Get('test')
  findTest(): string {
    return this.testService.getInfo();
  }

  @Get('list')
  async findAll(): Promise<User[]> {
    const userList = await this.userService.findAll();
    return Object.assign({
      data: userList,
      statusCode: 200,
      statusMsg: 'Success',
    });
  }

  @Get(':userId')
  async findOne(@Param('userId') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    return Object.assign({
      data: user,
      statusCode: 200,
      statusMsg: 'Success',
    });
  }

  @Post()
  async saveUser(@Body() user: User): Promise<void> {
    await this.userService.saveUser(user);
    return Object.assign({
      data: { ...user },
      statusCode: 201,
      statusMsg: 'Success',
    });
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') id: string) {
    await this.userService.deleteUser(id);
    return Object.assign({
      data: { userId: id },
      statusCode: 201,
      statusMsg: 'Success',
    });
  }
}
