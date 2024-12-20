import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.respository';
import { UserDto } from './dtos/user-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signup(newUser: UserDto): Promise<void> {
    return await this.usersRepository.createUser(newUser);
  }

  async signin(user: UserDto): Promise<Record<string, string>> {
    const authentiatedUser = await this.usersRepository.authenticateUser(user);
    const payload: JwtPayload = { username: authentiatedUser.username };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
