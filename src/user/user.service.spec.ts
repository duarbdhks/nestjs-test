import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/User';
import { Photo } from './domain/Photo';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TestService } from '../test/test.service';

export const getTypeOrmModule = () => {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'uaa',
    autoLoadEntities: true,
    // entities: [User, Photo],
    synchronize: true,
  });
};

describe('테스트', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [getTypeOrmModule(), TypeOrmModule.forFeature([User, Photo])],
      controllers: [UserController],
      providers: [UserService, TestService],
    }).compile();
  });

  describe('UserSerivce 테스트', () => {
    it(`createUser 트랜잭션 처리 테스트 - 성공`, async () => {
      const userService = app.get<UserService>(UserService);
      const isSuccess = await userService.createUsers([
        new User('a1', 'a1', '1234', 10, true, []),
        new User('b1', 'b1', '1234', 10, true, []),
      ]);
      console.log(isSuccess);
      expect(isSuccess).toBeTruthy();
    });

    it(`createUser 트랜잭션 처리 테스트 - 실패`, async () => {
      const userService = app.get<UserService>(UserService);
      const isSuccess = await userService.createUsers([
        new User('c1', 'c1', '1234', 10, true, []),
        new User(null, 'd1', '1234', 10, true, []),
      ]);
      console.log(isSuccess);
      expect(isSuccess).toBeFalsy();
    });
  });
});
