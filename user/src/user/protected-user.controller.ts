import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard, User, UserAuthorizationGuard } from '@hotspotti/common';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, UserAuthorizationGuard)
@Controller('users')
export class ProtectedUserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Retrieve user profile' })
  @ApiResponse({ status: 200, description: 'Profile successfully retrieved' })
  @ApiResponse({ status: 500, description: 'Profile retrieval failed' })
  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<any> {
    const user = await this.userService.findOne(id);

    return user;
  }

  @Patch('/:id/spottis')
  async addSpotti(
    @Param('id') userId: number,
    @Body() body: any,
  ): Promise<User> {
    const { spottiId } = body;

    return await this.userService.addSpotti(userId, spottiId);
  }

  @Get('/:id/spottis')
  async getSpottis(@Param('id') id: number) {
    const spottis = await this.userService.getAllSpottis(id);
    if (!spottis || spottis.length === 0) {
      throw new NotFoundException('No spottis found for this user!!');
    }

    return spottis;
  }

  // @ApiOperation({ summary: 'Create a new SpottiList for a user' })
  // @ApiResponse({ status: 201, description: 'SpottiList created successfully' })
  // @ApiResponse({ status: 404, description: 'User not found' })
  // @Post('/:id/spotti-lists')
  // async createSpottiList(
  //   @Param('id') userId: number,
  //   @Body('name') name: string,
  // ): Promise<SpottiList> {
  //   const spottiList = await this.userService.createSpottiList(userId, name);
  //   if (!spottiList) {
  //     throw new NotFoundException('Unable to create SpottiList');
  //   }

  //   return spottiList;
  // }
}
