import { Injectable, Scope } from '@nestjs/common';
import { UserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './domain/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }

  /**
   * User 리스트 조회
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * 특정 유저 조회
   * @param id
   */
  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ userId: id });
  }

  /**
   * 유저 저장
   * @param user
   */
  async saveUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  /**
   * 특정 유저 삭제
   * @param id
   */
  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete({ userId: id });
  }
}
