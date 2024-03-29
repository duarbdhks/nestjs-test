import { NestMiddleware, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): any {
    console.log(`Client Request 요청됨`);
    // console.log(req);
    next();
  }
}
