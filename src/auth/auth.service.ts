import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.respository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}
}
