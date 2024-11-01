import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { hashPassword, findUserByIdOrFail, validatePassword } from './utils/';
import {
  AppConfigService,
  SignInDto,
  Spotti,
  User,
  TokenService,
} from '@hotspotti/common';

@Injectable()
export class UserService {
  private readonly spottiSrvBaseUrlInternal: string;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    // @InjectRepository(Spotti) private spottiRepository: Repository<Spotti>,
    // eslint-disable-next-line prettier/prettier
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
    private readonly tokenService: TokenService,
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
    const normalizedEmail = email.toLowerCase();

    // see if email is in use
    const isEmailInUse = await this.findUserByEmail(normalizedEmail);
    if (isEmailInUse) {
      console.log('EMAILINUSE:', isEmailInUse);
      throw new BadRequestException('Email already exists.');
    }

    // hash the password
    const { hashedPassword, salt } = await hashPassword(password);

    const newUser = this.userRepository.create({
      email: normalizedEmail,
      hashedPassword: hashedPassword,
      salt: salt,
      firstName,
      lastName,
    });

    return this.userRepository.save(newUser);
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

  async signIn(signInDto: SignInDto): Promise<any> {
    const { email, password } = signInDto;
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCorrectPass = await validatePassword(password, user.hashedPassword);
    if (!isCorrectPass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userJwt = await this.tokenService.generateToken({
      userId: user.id,
      email: user.email,
    });

    return {
      message: 'Sign-in successful',
      accessToken: userJwt,
      user,
    };
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

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });
    return user;
  }

  // async createSpottiList(userId: number, name: string): Promise<SpottiList> {
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //     relations: ['spottiLists'],
  //   });

  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${userId} not found`);
  //   }

  //   const spottiList = this.spottiListRepository.create({ name, user });

  //   return this.spottiListRepository.save(spottiList);
  // }

  // async addSpottiToList(listId: number, spottiId: number): Promise<SpottiList> {
  //   const spottiList = await this.spottiListRepository.findOne({
  //     where: { id: listId },
  //     relations: ['spottis'],
  //   });
  //   const spotti = await this.spottiRepository.findOne({
  //     where: { id: spottiId },
  //   });

  //   if (!spottiList || !spotti) {
  //     throw new NotFoundException('SpottiList or Spotti not found');
  //   }

  //   spottiList.spottis.push(spotti);

  //   return this.spottiListRepository.save(spottiList);
  // }

  // async getSpottiListsByUser(userId: number): Promise<SpottiList[]> {
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //     relations: ['spottiLists'],
  //   });

  //   if (!user) {
  //     throw new NotFoundException(`user with ID ${userId} not found`);
  //   }

  //   return user.spottiLists;
  // }
}
