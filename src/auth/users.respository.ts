import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dtos/user-dto';
import * as bcrypt from 'bcrypt';
import { handleDatabaseError } from 'src/utils/errors/database-errors';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(newUser: UserDto) {
    // We create a salt and store hasehd p/w to DB
    try {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(newUser.password, salt);
      const user = this.create({
        username: newUser.username,
        password: hashedPassword,
      });
      await this.save(user);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  async authenticateUser(user: UserDto): Promise<User> {
    const foundUser = await this.findOneBy({ username: user.username });
    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordMatch = await bcrypt.compare(
      user.password,
      foundUser.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return foundUser;
  }
}
