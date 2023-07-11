import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Doe' },
  ];
  getUsers(): User[] {
    return this.users;
  }
  addUser(name: string): void {
    const newUser: User = {
      id: this.users.length + 1,
      name,
    };
    this.users.push(newUser);
  }
  putUser(id: number, name: string): void {
    const index = this.users.findIndex((user) => user.id === Number(id));
    if (index === -1) {
      console.error(`User with id ${id} not found.`);
      return;
    }
    console.log(`Updating user with id ${id} to have name ${name}`);
    this.users[index] = { ...this.users[index], name };
  }
  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== Number(id));
  }
}
