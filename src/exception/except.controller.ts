import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from './HttpExceptionFilter';

@Controller('except')
export class ExceptController {
  @Get(':code')
  @UseFilters(new HttpExceptionFilter())
  executeError(@Param('code') code: HttpStatus) {
    if (code >= 200 && code < 400) {
      return 'status OK';
    } else if (code === 403) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Forbidden Error',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('pipe/:id')
  exPipes(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ) {
    return `입력받은 number: ${id}`;
  }
}
