import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './users.respository';
import { JwtPayload } from './types';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const found = await this.usersRepository.findOneBy({ username });
    if (!found) {
      throw new UnauthorizedException('Could not find the user. Please login.');
    }
    return instanceToPlain(found) as User;
  }
}
