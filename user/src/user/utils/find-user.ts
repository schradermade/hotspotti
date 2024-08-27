import { User } from '@hotspotti/common';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export async function findUserByIdOrFail(
  id: number,
  userRepository: Repository<User>,
  relationsArray = [],
): Promise<User> {
  const user = await userRepository.findOne({
    where: { id },
    relations: relationsArray,
  });
  if (!user) {
    throw new NotFoundException('User not found!');
  }

  return user;
}
