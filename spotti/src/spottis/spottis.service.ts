import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Spotti } from './spotti.entity';
import { Repository } from 'typeorm';
import { CreateSpottiDto } from './dtos/create-spotti.dto';

@Injectable()
export class SpottisService {
  constructor(
    @InjectRepository(Spotti) private spottiRepository: Repository<Spotti>,
  ) {}

  async getAll(): Promise<Spotti[]> {
    const spottis = await this.spottiRepository.find();
    return spottis;
  }

  async createOne(data): Promise<any> {
    const newSpotti = this.spottiRepository.create(data);

    return this.spottiRepository.save(newSpotti);
  }

  async getOne(id: number) {
    if (!id) {
      return 'NO iD@!';
    }

    return await this.spottiRepository.findOne({ where: { id }, cache: false });
  }
}
