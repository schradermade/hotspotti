import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, User, SignInDto } from '@hotspotti/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    console.log('REACHED THE USER SERVICE SIGNUP POST ROUTE');
    const user = await this.userService.create(
      body.email,
      body.password,
      body.firstName,
      body.lastName,
    );

    return user;
  }

  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return this.userService.signIn(signInDto);
  }

  @Get('/email/:email')
  async findUserByEmail(@Param('email') email: string) {
    const user = await this.userService.findUserByEmail(email);
    console.log('USER!:', user);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}
