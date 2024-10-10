import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { hashPassword, findUserByIdOrFail } from './utils/';
import { AppConfigService, Spotti, User } from '@hotspotti/common';

@Injectable()
export class UserService {
  private readonly spottiSrvBaseUrlInternal: string;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(User) private spottiRepository: Repository<Spotti>,
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
  ) {
    this.spottiSrvBaseUrlInternal = this.appConfigService.getServiceBaseUrl(
      'SPOTTI_SRV_BASE_URL_INTERNAL',
    );
  }

  async create(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    // see if email is in use
    const users = await this.find(email);
    if (users.length) {
      throw new BadRequestException('Email already exists.');
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return this.userRepository.save(user);
  }

  find(email: string) {
    const users = this.userRepository.find({ where: { email } });
    if (!users) {
      throw new NotFoundException(`No user found with email ${email}`);
    }

    return users;
  }

  findOne(id: number) {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`No user found with ID: ${id}`);
    }

    return user;
  }

  async update(id: number, userProvidedData: Partial<User>) {
    const user = await findUserByIdOrFail(id, this.userRepository);

    Object.assign(user, userProvidedData);

    return this.userRepository.save(user);
  }

  async addSpotti(id: number, spottiId: number): Promise<User> {
    // find the user
    const user = await findUserByIdOrFail(id, this.userRepository, ['spottis']);
    // check if spottis array has been initialized
    if (!user.spottis) {
      user.spottis = [];
    }

    try {
      // retrieve spotti from spotti service
      const spottiServiceUrl = `${this.spottiSrvBaseUrlInternal}/spottis/${spottiId}`;

      const response = await firstValueFrom(
        this.httpService.get(spottiServiceUrl),
      );
      const spotti = response.data;

      if (!spotti) {
        throw new NotFoundException('spotti not found');
      }

      // Associate the Spotti with the user
      user.spottis.push(spotti);

      // save the updated user entity
      await this.userRepository.save(user);

      // return the added spotti
      return spotti;
    } catch (error) {
      console.log('ERROR:', error);
      throw new HttpException(
        `Saving Spotti: ${spottiId} to User: ${user.id} failed.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllSpottis(id: number): Promise<Spotti[]> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['spottis'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.spottis;
  }
}
