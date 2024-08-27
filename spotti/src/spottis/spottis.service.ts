import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Spotti } from './spotti.entity';
import { Repository } from 'typeorm';
import { CreateSpottiDto } from './dtos/create-spotti.dto';

@Injectable()
export class SpottisService {
  constructor(
    @InjectRepository(Spotti) private spottiRepo: Repository<Spotti>,
  ) {}

  async getAll(): Promise<Spotti[]> {
    const spottis = await this.spottiRepo.find();
    return spottis;
  }

  async create(createSpottiDto: CreateSpottiDto): Promise<Spotti> {
    const newSpotti = this.spottiRepo.create(createSpottiDto);

    return this.spottiRepo.save(newSpotti);
  }

  async getOne(id: number) {
    if (!id) {
      return 'NO iD@!';
    }

    return await this.spottiRepo.findOne({ where: { id }, cache: false });
  }
}
