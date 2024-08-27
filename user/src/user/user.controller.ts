import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@hotspotti/common';

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

  // @Patch('/:id')
  // updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
  //   return this.userService.update(parseInt(id), body);
  // }

  @Patch('/:id/spottis')
  async addSpotti(
    @Param('id') userId: number,
    @Body() body: any,
  ): Promise<User> {
    const { spottiId } = body;
    return await this.userService.addSpotti(userId, spottiId);
  }

  @Get('/:id/spottis')
  async getSpottis(@Param('id') userId: number) {
    return this.userService.getAllSpottis(userId);
  }
}
