import {
  Body,
  Controller,
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

@Controller({
  path: 'user',
  scope: Scope.REQUEST,
})
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
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  saveUser(@Body() userDto: UserDto): string {
    console.log(userDto);
    this.userService.saveUser(userDto);
    return Object.assign({
      data: { ...userDto },
      statusCode: 201,
      statusMsg: '생성 성공',
    });
  }

  // @Get('list')
  // findAll(): Promise<any[]> {
  //   return new Promise((resolve) => {
  //     setTimeout(
  //       () => resolve([{ userName: '염규완' }, { userName: '김연아' }]),
  //       100,
  //     );
  //   });
  // }
  //
  // @Get(':userId')
  // findOne(@Param('userId') id: string, @Res() res): string {
  //   return res.status(200).send({ id, userName: '염규완' });
  // }
  //
  // @Post()
  // @HttpCode(201)
  // @Header('Cache-Control', 'none')
  // @Redirect('https://www.naver.com', 301)
  // saveUser(@Body() userDto: UserDto): string {
  //   return Object.assign({
  //     statusCode: 201,
  //     data: { ...userDto },
  //     statusMsg: '생성 성공',
  //   });
  // }
}
