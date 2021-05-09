import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getInfo(): string {
    return `이것은 테스트 서비스 인스턴스 입니다.`;
  }
}
