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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ForbiddenException } from './exceptions/forbidden.exception';

@Controller('users')
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
}
