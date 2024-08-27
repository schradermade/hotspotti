import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Spotti } from '@hotspotti/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Spotti) private spottiRepository: Repository<Spotti>,
    private readonly httpService: HttpService,
  ) {}

  find(email: string) {
    const users = this.userRepository.find({ where: { email } });
    if (!users) {
      throw new NotFoundException(`No user found with email ${email}`);
    }

    return users;
  }

  create(email: string, password: string) {
    // if User entity instance is not created first
    // hooks won't be executed in rest of app; example: @AfterInsert()
    // --> passing plain object into repo.save wont call hooks
    const user = this.userRepository.create({ email, password });

    return this.userRepository.save(user);
  }

  async update(id: number, userProvidedData: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    Object.assign(user, userProvidedData);

    return this.userRepository.save(user);
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

  async addSpotti(userId: number, spottiId: number): Promise<User> {
    // find the user
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['spottis'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // if (!user.spottis) {
    //   user.spottis = [];
    // }

    try {
      // retrieve spotti from spotti service
      const spottiServiceUrl = `http://spotti-srv:3000/spottis/${spottiId}`;
      const response = await firstValueFrom(
        this.httpService.get(spottiServiceUrl),
      );
      const spotti = response.data;
      if (!spotti) {
        throw new NotFoundException('spotti not found');
      }

      // Associate the Spotti with the user
      user.spottis.push(spotti);

      // save the updated user entity and return
      return this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        `Saving Spotti: ${spottiId} to User: ${user.id} failed.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllSpottis(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['spottis'],
    });
    return user.spottis;
  }
}
