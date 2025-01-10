import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  async createGroup(data: any) {
    const newGroup = this.groupsRepository.create(data);

    return this.groupsRepository.save(newGroup);
  }

  async findGroupById(id: string) {
    const group = await this.groupsRepository.findOne({ where: { id } });

    return group;
  }

  async updateGroup(id: string, data: any) {
    // const group = await this.groupsRepository.update(id, data);
    const group = await this.findGroupById(id);

    Object.assign(group, data);

    return this.groupsRepository.save(group);
  }

  async findAllGroups() {
    const groups = await this.groupsRepository.find();

    return groups;
  }

  async deleteGroupById(id: string) {
    await this.groupsRepository.delete({ id });
  }
}
