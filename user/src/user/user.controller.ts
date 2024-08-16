import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() body: any): Promise<any> {
    const user = await this.userService.registerNewUser(
      body.email,
      body.password,
    );
    // session.userId = user.id;

    return user;
  }
}
