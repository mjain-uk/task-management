import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.respository';
import { UserDto } from './dtos/user-dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signup(newUser: UserDto): Promise<void> {
    return await this.usersRepository.createUser(newUser);
  }

  async signin(user: UserDto): Promise<User> {
    return await this.usersRepository.authenticateUser(user);
  }
}
