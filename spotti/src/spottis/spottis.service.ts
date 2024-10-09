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

  async createOne(data: CreateSpottiDto): Promise<Spotti> {
    const newSpotti = this.spottiRepository.create(data);

    return this.spottiRepository.save(newSpotti);
  }

  updateOne(data: any): any {
    return;
  }

  async getAll(): Promise<Spotti[]> {
    const spottis = await this.spottiRepository.find();
    return spottis;
  }

  async getOne(id: number) {
    if (!id) {
      return 'NO iD!';
    }

    return await this.spottiRepository.findOne({ where: { id }, cache: false });
  }
}
