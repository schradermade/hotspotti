import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hub, Spotti } from '@hotspotti/common';
import { CreateHubDto } from './dtos/create-hub.dto';

@Injectable()
export class HubsService {
  constructor(
    @InjectRepository(Hub) private hubRepository: Repository<Hub>,
    @InjectRepository(Hub) private spottiRepository: Repository<Spotti>,
  ) {}

  async createOne(data: CreateHubDto): Promise<Hub> {
    const newHub = this.hubRepository.create(data);

    return this.hubRepository.save(newHub);
  }

  async getOne(id: number): Promise<Hub> {
    const hub = await this.hubRepository.findOne({ where: { id } });
    if (!hub) {
      throw new NotFoundException(`Hub with ID ${id} not found'`);
    }
    return hub;
  }

  async associateSpottiWithHub(hubId: number, spottiId: number): Promise<Hub> {
    const hub = await this.hubRepository.findOne({
      where: { id: hubId },
      relations: ['spottis'],
    });

    if (!hub) {
      throw new NotFoundException('Hub not found');
    }

    const spotti = await this.spottiRepository.findOne({
      where: { id: spottiId },
    });

    if (!spotti) {
      throw new NotFoundException('Spotti not found');
    }

    hub.spottis.push(spotti);
    return this.hubRepository.save(hub);
  }
}
