import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';

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
}
