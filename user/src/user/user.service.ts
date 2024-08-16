import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  find(email: string) {
    const users = this.repo.find({ where: { email } });
    if (!users) {
      throw new NotFoundException(`No user found with email ${email}`);
    }

    return users;
  }

  create(email: string, password: string) {
    // if User entity instance is not created first
    // hooks won't be executed in rest of app; example: @AfterInsert()
    // --> passing plain object into repo.save wont call hooks
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async registerNewUser(email: string, password: string) {
    // see if email is in use
    console.log('BEFORE-USER:');

    const users = await this.find(email);
    console.log('USER:', users);
    if (users.length) {
      throw new BadRequestException('Email already exists.');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.create(email, result);

    return user;
  }
}
