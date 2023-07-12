import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ForbiddenException } from './exceptions/forbidden.exception';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { User } from './decorator/user/user.decorator';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): User[] {
    return this.usersService.getUsers();
  }

  @Post()
  addUser(@Body() name: string): void {
    this.usersService.addUser(name);
  }

  @Put(':id')
  putUser(@Param('id') id: number, @Body('name') name: string): void {
    this.usersService.putUser(id, name);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): void {
    this.usersService.deleteUser(id);
  }
  @Get('throw')
  getException(): string {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  @Get('custom_throw')
  getCustomException(): string {
    throw new ForbiddenException();
  }
  @Post('custom_decorator')
  getCustomDecorator(@User() user: User) {
    return user;
  }
}
